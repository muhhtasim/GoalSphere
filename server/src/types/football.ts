export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled'

export interface LeagueSummary {
  id: string
  name: string
  country: string
  season: string
  type: 'league' | 'cup'
  logoUrl?: string
}

export interface TeamSummary {
  id: string
  name: string
  shortName: string
  country: string
  founded?: number
  logoUrl?: string
  venue?: string
}

export interface ScoreLine {
  home: number
  away: number
}

export interface FixtureRecord {
  id: string
  homeTeamId: string
  awayTeamId: string
  leagueId: string
  venue: string
  kickoffAt: string
  status: MatchStatus
  minute?: number
  score?: ScoreLine
  round?: string
  referee?: string
}

export interface MatchDetails extends FixtureRecord {
  homeTeam: TeamSummary
  awayTeam: TeamSummary
  league: LeagueSummary
  events?: MatchEvent[]
  stats?: Record<string, number>
  lineups?: Record<string, unknown>
}

export interface MatchEvent {
  id: string
  matchId: string
  minute: number
  teamId: string
  playerId?: string
  type: 'goal' | 'card' | 'substitution' | 'assist' | 'warning' | 'penalty'
  description: string
}

export interface CommentaryEntry {
  id: string
  minute: number
  teamId: string
  playerId?: string
  text: string
  type: 'normal' | 'goal' | 'card' | 'substitution'
}

export interface LineupPlayer {
  id: string
  name: string
  position: string
  number: number
  isStarter: boolean
}

export interface TeamLineup {
  teamId: string
  formation: string
  coach: string
  players: LineupPlayer[]
}

export interface MatchStatisticLine {
  label: string
  home: number
  away: number
}

export interface HeadToHeadRecord {
  id: string
  homeTeamId: string
  awayTeamId: string
  homeWins: number
  awayWins: number
  draws: number
  lastMeeting: string
}

export interface MatchDetailData extends FixtureRecord {
  homeTeam: TeamSummary
  awayTeam: TeamSummary
  league: LeagueSummary
  events?: MatchEvent[]
  commentary: CommentaryEntry[]
  stats: MatchStatisticLine[]
  lineups: TeamLineup[]
  h2h: HeadToHeadRecord[]
  formations: Record<string, string>
}

export interface StandingRecord {
  id: string
  leagueId: string
  teamId: string
  position: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  source: string
  publishedAt: string
  leagueId?: string
  teamIds?: string[]
  playerIds?: string[]
  tags?: string[]
}

export interface SyncRunSummary {
  kind: string
  count: number
  lastUpdated: string
  items: string[]
}

export interface FootballDataProvider {
  readonly name: string
  getLeagues(): Promise<LeagueSummary[]>
  getTeams(): Promise<TeamSummary[]>
  getLiveMatches(): Promise<FixtureRecord[]>
  getFixtures(): Promise<FixtureRecord[]>
  getResults(): Promise<FixtureRecord[]>
  getMatchDetails(matchId: string): Promise<MatchDetailData | null>
  getStandings(): Promise<StandingRecord[]>
  getNews(): Promise<NewsArticle[]>
}
