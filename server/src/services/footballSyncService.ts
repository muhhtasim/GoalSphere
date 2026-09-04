import type {
  FixtureRecord,
  FootballDataProvider,
  LeagueSummary,
  MatchDetailData,
  NewsArticle,
  StandingRecord,
  SyncRunSummary,
  TeamSummary,
} from '../types/football'

export class FootballSyncService {
  constructor(private readonly provider: FootballDataProvider) {}

  async syncLeagues(): Promise<SyncRunSummary> {
    const items = await this.provider.getLeagues()
    return this.buildSummary('leagues', items)
  }

  async syncTeams(): Promise<SyncRunSummary> {
    const items = await this.provider.getTeams()
    return this.buildSummary('teams', items)
  }

  async syncLiveMatches(): Promise<SyncRunSummary> {
    const items = await this.provider.getLiveMatches()
    return this.buildSummary('live-matches', items)
  }

  async syncFixtures(): Promise<SyncRunSummary> {
    const items = await this.provider.getFixtures()
    return this.buildSummary('fixtures', items)
  }

  async syncResults(): Promise<SyncRunSummary> {
    const items = await this.provider.getResults()
    return this.buildSummary('results', items)
  }

  async syncStandings(): Promise<SyncRunSummary> {
    const items = await this.provider.getStandings()
    return this.buildSummary('standings', items)
  }

  async syncNews(): Promise<SyncRunSummary> {
    const items = await this.provider.getNews()
    return this.buildSummary('news', items)
  }

  async syncMatchDetails(matchId: string): Promise<MatchDetailData | null> {
    return this.provider.getMatchDetails(matchId)
  }

  async syncAll(): Promise<{
    leagues: SyncRunSummary
    teams: SyncRunSummary
    liveMatches: SyncRunSummary
    fixtures: SyncRunSummary
    results: SyncRunSummary
    standings: SyncRunSummary
    news: SyncRunSummary
  }> {
    const [leagues, teams, liveMatches, fixtures, results, standings, news] = await Promise.all([
      this.syncLeagues(),
      this.syncTeams(),
      this.syncLiveMatches(),
      this.syncFixtures(),
      this.syncResults(),
      this.syncStandings(),
      this.syncNews(),
    ])

    return {
      leagues,
      teams,
      liveMatches,
      fixtures,
      results,
      standings,
      news,
    }
  }

  private buildSummary<T extends { id: string }>(kind: string, items: T[]): SyncRunSummary {
    return {
      kind,
      count: items.length,
      lastUpdated: new Date().toISOString(),
      items: items.map((item) => item.id),
    }
  }
}

export type { FixtureRecord, LeagueSummary, NewsArticle, StandingRecord, TeamSummary }
