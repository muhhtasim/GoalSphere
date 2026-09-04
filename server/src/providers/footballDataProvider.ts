import { env } from '../config/env'
import { MockFootballDataProvider } from './mockFootballDataProvider'
import type {
  FixtureRecord,
  FootballDataProvider,
  LeagueSummary,
  MatchDetailData,
  NewsArticle,
  StandingRecord,
  TeamSummary,
} from '../types/football'

const requestQueue = {
  lastRequestAt: 0,
  intervalMs: Math.max(250, env.footballRequestIntervalMs ?? 1500),
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class RestFootballDataProvider implements FootballDataProvider {
  readonly name = 'external-provider'

  constructor(
    private readonly apiKey: string,
    private readonly baseUrl: string,
  ) {}

  private async request<T>(path: string): Promise<T[]> {
    if (!this.apiKey || !this.baseUrl) {
      return []
    }

    const now = Date.now()
    const timeSinceLastRequest = now - requestQueue.lastRequestAt

    if (timeSinceLastRequest < requestQueue.intervalMs) {
      await sleep(requestQueue.intervalMs - timeSinceLastRequest)
    }

    requestQueue.lastRequestAt = Date.now()

    try {
      const response = await fetch(`${this.baseUrl.replace(/\/$/, '')}${path}`, {
        headers: {
          'x-api-key': this.apiKey,
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        console.warn(`Football API request failed for ${path}: ${response.status}`)
        return []
      }

      const payload = (await response.json()) as { response?: T[]; data?: T[] }
      return (payload.response ?? payload.data ?? []) as T[]
    } catch (error) {
      console.warn(`Football API request failed for ${path}:`, error)
      return []
    }
  }

  async getLeagues(): Promise<LeagueSummary[]> {
    return this.request<LeagueSummary>('/leagues')
  }

  async getTeams(): Promise<TeamSummary[]> {
    return this.request<TeamSummary>('/teams')
  }

  async getLiveMatches(): Promise<FixtureRecord[]> {
    return this.request<FixtureRecord>('/fixtures?live=all')
  }

  async getFixtures(): Promise<FixtureRecord[]> {
    return this.request<FixtureRecord>('/fixtures?status=scheduled')
  }

  async getResults(): Promise<FixtureRecord[]> {
    return this.request<FixtureRecord>('/fixtures?status=ft')
  }

  async getMatchDetails(matchId: string): Promise<MatchDetailData | null> {
    if (!this.apiKey || !this.baseUrl) return null

    const [item] = await this.request<MatchDetailData>(`/fixtures?id=${matchId}`)
    return item ?? null
  }

  async getStandings(): Promise<StandingRecord[]> {
    return this.request<StandingRecord>('/standings')
  }

  async getNews(): Promise<NewsArticle[]> {
    return this.request<NewsArticle>('/news')
  }
}

export function getFootballDataProvider(): FootballDataProvider {
  const providerName = (env.footballProvider ?? 'mock').toLowerCase()

  if (providerName === 'live' && env.footballApiKey && env.footballApiBaseUrl) {
    return new RestFootballDataProvider(env.footballApiKey, env.footballApiBaseUrl)
  }

  return new MockFootballDataProvider()
}
