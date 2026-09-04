import { env } from '../config/env'
import { getFootballDataProvider } from '../providers/footballDataProvider'
import { getSocketServer } from '../socket'
import type { MatchDetailData, LeagueSummary, TeamSummary, FixtureRecord } from '../types/football'
import { FootballSyncService } from './footballSyncService'
import { getLiveMatchStore } from './liveMatchStore'

const activeIntervalMs = Math.max(10000, (env.liveSyncIntervalSeconds ?? 30) * 1000)
const idleIntervalMs = Math.max(30000, (env.liveSyncIdleIntervalSeconds ?? 120) * 1000)

let timer: NodeJS.Timeout | undefined
let polling = false

function fallbackLeague(fixture: FixtureRecord): LeagueSummary {
  return {
    id: fixture.leagueId,
    name: fixture.leagueId,
    country: 'Unknown',
    season: 'current',
    type: 'league',
  }
}

function fallbackTeam(teamId: string, fallbackName: string): TeamSummary {
  return {
    id: teamId,
    name: fallbackName,
    shortName: fallbackName,
    country: 'Unknown',
  }
}

function createFallbackMatchDetail(fixture: FixtureRecord): MatchDetailData {
  const homeTeam = fallbackTeam(fixture.homeTeamId, fixture.homeTeamId)
  const awayTeam = fallbackTeam(fixture.awayTeamId, fixture.awayTeamId)

  return {
    ...fixture,
    homeTeam,
    awayTeam,
    league: fallbackLeague(fixture),
    commentary: [],
    stats: [],
    lineups: [],
    h2h: [],
    formations: {},
    events: [],
  }
}

export function startLiveMatchPolling(): void {
  if (timer) {
    return
  }

  const run = async (): Promise<void> => {
    if (polling) {
      return
    }

    polling = true

    try {
      const provider = getFootballDataProvider()
      const syncService = new FootballSyncService(provider)
      const liveMatches = await provider.getLiveMatches()

      if (liveMatches.length === 0) {
        getLiveMatchStore().clearInactive()
        emitIdleSnapshot()
        timer = setTimeout(() => {
          void run()
        }, idleIntervalMs)
        return
      }

      const details = await Promise.all(
        liveMatches.map(async (fixture) => {
          try {
            return (await syncService.syncMatchDetails(fixture.id)) ?? createFallbackMatchDetail(fixture)
          } catch (error) {
            console.warn(`Unable to resolve live match ${fixture.id}:`, error)
            return createFallbackMatchDetail(fixture)
          }
        }),
      )

      const changes: Array<{ type: string; matchId: string; message: string; minute?: number; timestamp: string }> = []

      for (const match of details) {
        const storeChanges = getLiveMatchStore().upsert(match)
        changes.push(...storeChanges)
      }

      const snapshot = getLiveMatchStore().snapshot()

      const socket = getSocketServer()
      if (socket) {
        socket.emit('live:matches', {
          matches: snapshot.matches,
          changes,
          lastUpdated: snapshot.lastUpdated,
        })
      }

      console.log(`Live match sync finished: ${snapshot.matches.length} active match(es).`)
      timer = setTimeout(() => {
        void run()
      }, activeIntervalMs)
    } catch (error) {
      console.error('Live match polling failed:', error)
      timer = setTimeout(() => {
        void run()
      }, idleIntervalMs)
    } finally {
      polling = false
    }
  }

  void run()
}

function emitIdleSnapshot(): void {
  const socket = getSocketServer()
  if (!socket) {
    return
  }

  socket.emit('live:matches', {
    matches: [],
    changes: [{ type: 'status-change', matchId: 'system', message: 'No live matches available', timestamp: new Date().toISOString() }],
    lastUpdated: new Date().toISOString(),
  })
}
