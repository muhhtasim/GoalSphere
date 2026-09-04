export type MatchStatus = 'live' | 'scheduled' | 'finished'

export interface Team {
  id: string
  name: string
  shortName: string
  badge: string
  accent: string
}

export interface MatchCommentary {
  id: string
  minute: number
  teamId: string
  text: string
  type: 'goal' | 'card' | 'substitution' | 'normal'
}

export interface MatchStatRow {
  label: string
  home: number
  away: number
}

export interface LineupPlayer {
  id: string
  name: string
  position: string
  number: number
  isStarter: boolean
}

export interface MatchLineup {
  teamId: string
  formation: string
  coach: string
  players: LineupPlayer[]
}

export interface HeadToHead {
  homeWins: number
  awayWins: number
  draws: number
  lastMeeting: string
}

export interface Match {
  id: string
  homeTeam: Team
  awayTeam: Team
  competition: string
  venue: string
  kickoff: string
  status: MatchStatus
  minute?: number
  score: {
    home: number
    away: number
  }
  referee?: string
  commentary: MatchCommentary[]
  stats: MatchStatRow[]
  lineups: MatchLineup[]
  h2h: HeadToHead
}
