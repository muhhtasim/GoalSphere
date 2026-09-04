import type { MatchDetailData } from '../types/football'

export interface LiveMatchChange {
  type: 'score-change' | 'goal' | 'card' | 'substitution' | 'status-change'
  matchId: string
  message: string
  minute?: number
  timestamp: string
}

export interface LiveMatchSnapshot {
  matches: MatchDetailData[]
  lastUpdated: string
  changes: LiveMatchChange[]
}

const liveMatches = new Map<string, MatchDetailData>()

function buildFallbackMatch(match: MatchDetailData): MatchDetailData {
  return {
    ...match,
    homeTeam: match.homeTeam ?? {
      id: match.homeTeamId,
      name: match.homeTeamId,
      shortName: match.homeTeamId,
      country: 'Unknown',
    },
    awayTeam: match.awayTeam ?? {
      id: match.awayTeamId,
      name: match.awayTeamId,
      shortName: match.awayTeamId,
      country: 'Unknown',
    },
    league: match.league ?? {
      id: match.leagueId,
      name: match.leagueId,
      country: 'Unknown',
      season: 'current',
      type: 'league',
    },
    commentary: match.commentary ?? [],
    stats: match.stats ?? [],
    lineups: match.lineups ?? [],
    h2h: match.h2h ?? [],
    formations: match.formations ?? {},
    events: match.events ?? [],
  }
}

function summarizeNewEvents(previous: MatchDetailData | undefined, current: MatchDetailData): LiveMatchChange[] {
  const previousEvents = previous?.events ?? []
  const currentEvents = current.events ?? []

  return currentEvents
    .filter((event) => !previousEvents.some((previousEvent) => previousEvent.id === event.id))
    .map((event) => {
      const base = {
        matchId: current.id,
        minute: event.minute,
        timestamp: new Date().toISOString(),
      }

      if (event.type === 'goal') {
        return {
          ...base,
          type: 'goal',
          message: `${event.description} (${event.minute}')`,
        }
      }

      if (event.type === 'card' || event.type === 'warning') {
        return {
          ...base,
          type: 'card',
          message: `${event.description} (${event.minute}')`,
        }
      }

      if (event.type === 'substitution') {
        return {
          ...base,
          type: 'substitution',
          message: `${event.description} (${event.minute}')`,
        }
      }

      return {
        ...base,
        type: 'score-change',
        message: event.description,
      }
    })
}

export function getLiveMatchStore() {
  return {
    upsert(match: MatchDetailData): LiveMatchChange[] {
      const previous = liveMatches.get(match.id)
      const nextMatch = buildFallbackMatch(match)
      const changes: LiveMatchChange[] = []

      if (previous) {
        const previousScore = previous.score ?? { home: 0, away: 0 }
        const nextScore = nextMatch.score ?? { home: 0, away: 0 }

        if (previous.status !== nextMatch.status) {
          changes.push({
            type: 'status-change',
            matchId: nextMatch.id,
            message: `Status changed from ${previous.status ?? 'unknown'} to ${nextMatch.status ?? 'unknown'}`,
            timestamp: new Date().toISOString(),
          })
        }

        if (
          previousScore.home !== nextScore.home ||
          previousScore.away !== nextScore.away
        ) {
          changes.push({
            type: 'score-change',
            matchId: nextMatch.id,
            message: `Score changed: ${previousScore.home}-${previousScore.away} → ${nextScore.home}-${nextScore.away}`,
            minute: nextMatch.minute,
            timestamp: new Date().toISOString(),
          })
        }

        changes.push(...summarizeNewEvents(previous, nextMatch))
      }

      liveMatches.set(nextMatch.id, nextMatch)
      return changes
    },

    remove(matchId: string): void {
      liveMatches.delete(matchId)
    },

    snapshot(): LiveMatchSnapshot {
      return {
        matches: Array.from(liveMatches.values()),
        lastUpdated: new Date().toISOString(),
        changes: [],
      }
    },

    clearInactive(): void {
      const liveIds = Array.from(liveMatches.keys())
      for (const id of liveIds) {
        const match = liveMatches.get(id)
        if (!match || match.status !== 'live') {
          liveMatches.delete(id)
        }
      }
    },
  }
}
