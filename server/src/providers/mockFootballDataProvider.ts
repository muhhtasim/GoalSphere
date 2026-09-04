import type {
  CommentaryEntry,
  FixtureRecord,
  FootballDataProvider,
  HeadToHeadRecord,
  LeagueSummary,
  MatchDetailData,
  NewsArticle,
  StandingRecord,
  TeamLineup,
  TeamSummary,
} from '../types/football'

export class MockFootballDataProvider implements FootballDataProvider {
  readonly name = 'mock-provider'

  private readonly leagues: LeagueSummary[] = [
    { id: 'league-champions', name: 'UEFA Champions League', country: 'Europe', season: '2026/27', type: 'cup' },
    { id: 'league-premier', name: 'Premier League', country: 'England', season: '2026/27', type: 'league' },
    { id: 'league-la-liga', name: 'La Liga', country: 'Spain', season: '2026/27', type: 'league' },
  ]

  private readonly teams: TeamSummary[] = [
    { id: 'team-real-madrid', name: 'Real Madrid', shortName: 'RMA', country: 'Spain', founded: 1902, venue: 'Santiago Bernabéu' },
    { id: 'team-barcelona', name: 'Barcelona', shortName: 'BAR', country: 'Spain', founded: 1899, venue: 'Camp Nou' },
    { id: 'team-liverpool', name: 'Liverpool', shortName: 'LIV', country: 'England', founded: 1892, venue: 'Anfield' },
    { id: 'team-arsenal', name: 'Arsenal', shortName: 'ARS', country: 'England', founded: 1886, venue: 'Emirates Stadium' },
  ]

  private readonly fixtures: FixtureRecord[] = [
    {
      id: 'fixture-live-1',
      homeTeamId: 'team-real-madrid',
      awayTeamId: 'team-barcelona',
      leagueId: 'league-champions',
      venue: 'Santiago Bernabéu',
      kickoffAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      status: 'live',
      minute: 63,
      score: { home: 2, away: 1 },
      round: 'Group Stage',
      referee: 'Szymon Marciniak',
    },
    {
      id: 'fixture-upcoming-1',
      homeTeamId: 'team-liverpool',
      awayTeamId: 'team-arsenal',
      leagueId: 'league-premier',
      venue: 'Anfield',
      kickoffAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
      status: 'scheduled',
      round: 'Matchday 12',
    },
    {
      id: 'fixture-result-1',
      homeTeamId: 'team-barcelona',
      awayTeamId: 'team-arsenal',
      leagueId: 'league-champions',
      venue: 'Camp Nou',
      kickoffAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      status: 'finished',
      score: { home: 3, away: 1 },
      round: 'Group Stage',
    },
  ]

  private readonly standings: StandingRecord[] = [
    { id: 'standing-1', leagueId: 'league-premier', teamId: 'team-liverpool', position: 1, played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 24, goalsAgainst: 8, goalDifference: 16, points: 25 },
    { id: 'standing-2', leagueId: 'league-premier', teamId: 'team-arsenal', position: 2, played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 20, goalsAgainst: 9, goalDifference: 11, points: 23 },
    { id: 'standing-3', leagueId: 'league-la-liga', teamId: 'team-real-madrid', position: 1, played: 9, won: 8, drawn: 0, lost: 1, goalsFor: 22, goalsAgainst: 7, goalDifference: 15, points: 24 },
    { id: 'standing-4', leagueId: 'league-la-liga', teamId: 'team-barcelona', position: 2, played: 9, won: 7, drawn: 1, lost: 1, goalsFor: 21, goalsAgainst: 8, goalDifference: 13, points: 22 },
  ]

  private readonly news: NewsArticle[] = [
    {
      id: 'news-1',
      title: 'Real Madrid hold narrow edge in Clasico thriller',
      summary: 'A late push kept Madrid in control of the title race as the rivalry produced a dramatic match.',
      content: 'Real Madrid edged past Barcelona in a tense encounter with decisive pressure and high-quality transitions.',
      source: 'GoalSphere Desk',
      publishedAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      teamIds: ['team-real-madrid', 'team-barcelona'],
      tags: ['Madrid', 'Barcelona', 'title race'],
    },
    {
      id: 'news-2',
      title: 'Liverpool prepare for a critical test against Arsenal',
      summary: 'The league summit clash will define the next stage of the title race.',
      content: 'Liverpool are preparing for a decisive meeting against Arsenal in a match that could shape the table.',
      source: 'GoalSphere Desk',
      publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      teamIds: ['team-liverpool', 'team-arsenal'],
      leagueId: 'league-premier',
      tags: ['Liverpool', 'Arsenal'],
    },
  ]

  async getLeagues(): Promise<LeagueSummary[]> {
    return this.leagues
  }

  async getTeams(): Promise<TeamSummary[]> {
    return this.teams
  }

  async getLiveMatches(): Promise<FixtureRecord[]> {
    return this.fixtures.filter((fixture) => fixture.status === 'live')
  }

  async getFixtures(): Promise<FixtureRecord[]> {
    return this.fixtures.filter((fixture) => fixture.status !== 'finished')
  }

  async getResults(): Promise<FixtureRecord[]> {
    return this.fixtures.filter((fixture) => fixture.status === 'finished')
  }

  async getMatchDetails(matchId: string): Promise<MatchDetailData | null> {
    const fixture = this.fixtures.find((item) => item.id === matchId)
    if (!fixture) return null

    const homeTeam = this.teams.find((team) => team.id === fixture.homeTeamId)
    const awayTeam = this.teams.find((team) => team.id === fixture.awayTeamId)
    const league = this.leagues.find((item) => item.id === fixture.leagueId)

    if (!homeTeam || !awayTeam || !league) return null

    const commentary: CommentaryEntry[] = [
      {
        id: 'commentary-1',
        minute: 12,
        teamId: homeTeam.id,
        playerId: 'player-1',
        type: 'normal',
        text: `${homeTeam.name} begin with quick pressure in midfield.`,
      },
      {
        id: 'commentary-2',
        minute: 31,
        teamId: homeTeam.id,
        playerId: 'player-1',
        type: 'goal',
        text: 'Goal for Real Madrid! A precise finish after a sweeping move.',
      },
      {
        id: 'commentary-3',
        minute: 58,
        teamId: awayTeam.id,
        type: 'card',
        text: 'Yellow card shown to the away side after a tactical foul.',
      },
    ]

    const stats = [
      { label: 'Possession', home: 58, away: 42 },
      { label: 'Shots', home: 11, away: 7 },
      { label: 'Shots on target', home: 5, away: 3 },
      { label: 'Pass accuracy', home: 86, away: 80 },
    ]

    const lineups: TeamLineup[] = [
      {
        teamId: homeTeam.id,
        formation: '4-3-3',
        coach: 'Carlo Ancelotti',
        players: [
          { id: 'player-10', name: 'Courtois', position: 'GK', number: 1, isStarter: true },
          { id: 'player-11', name: 'Carvajal', position: 'RB', number: 2, isStarter: true },
          { id: 'player-12', name: 'Militao', position: 'CB', number: 3, isStarter: true },
          { id: 'player-13', name: 'Ramos', position: 'CB', number: 4, isStarter: true },
          { id: 'player-14', name: 'Mendy', position: 'LB', number: 23, isStarter: true },
        ],
      },
      {
        teamId: awayTeam.id,
        formation: '4-2-3-1',
        coach: 'Xavi',
        players: [
          { id: 'player-20', name: 'ter Stegen', position: 'GK', number: 1, isStarter: true },
          { id: 'player-21', name: 'Koundé', position: 'RB', number: 23, isStarter: true },
          { id: 'player-22', name: 'Araujo', position: 'CB', number: 4, isStarter: true },
          { id: 'player-23', name: 'Cubarsí', position: 'CB', number: 5, isStarter: true },
          { id: 'player-24', name: 'Balde', position: 'LB', number: 3, isStarter: true },
        ],
      },
    ]

    const h2h: HeadToHeadRecord[] = [
      {
        id: 'h2h-1',
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeWins: 8,
        awayWins: 6,
        draws: 2,
        lastMeeting: fixture.kickoffAt,
      },
    ]

    return {
      ...fixture,
      homeTeam,
      awayTeam,
      league,
      events: [
        {
          id: 'event-1',
          matchId: fixture.id,
          minute: 31,
          teamId: homeTeam.id,
          playerId: 'player-1',
          type: 'goal',
          description: `${homeTeam.name} scored`,
        },
      ],
      commentary,
      stats,
      lineups,
      h2h,
      formations: {
        [homeTeam.id]: '4-3-3',
        [awayTeam.id]: '4-2-3-1',
      },
    }
  }

  async getStandings(): Promise<StandingRecord[]> {
    return this.standings
  }

  async getNews(): Promise<NewsArticle[]> {
    return this.news
  }
}
