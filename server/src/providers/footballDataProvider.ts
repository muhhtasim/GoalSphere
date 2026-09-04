import { env } from '../config/env'
import { MockFootballDataProvider } from './mockFootballDataProvider'
import type { FootballDataProvider } from '../types/football'

export class RestFootballDataProvider implements FootballDataProvider {
  readonly name = 'external-provider'

  constructor(
    private readonly apiKey: string,
    private readonly baseUrl: string,
  ) {}

  async getLeagues(): Promise<never[]> {
    if (!this.apiKey || !this.baseUrl) return []
    return []
  }

  async getTeams(): Promise<never[]> {
    if (!this.apiKey || !this.baseUrl) return []
    return []
  }

  async getLiveMatches(): Promise<never[]> {
    if (!this.apiKey || !this.baseUrl) return []
    return []
  }

  async getFixtures(): Promise<never[]> {
    if (!this.apiKey || !this.baseUrl) return []
    return []
  }

  async getResults(): Promise<never[]> {
    if (!this.apiKey || !this.baseUrl) return []
    return []
  }

  async getMatchDetails(): Promise<null> {
    if (!this.apiKey || !this.baseUrl) return null
    return null
  }

  async getStandings(): Promise<never[]> {
    if (!this.apiKey || !this.baseUrl) return []
    return []
  }

  async getNews(): Promise<never[]> {
    if (!this.apiKey || !this.baseUrl) return []
    return []
  }
}

export function getFootballDataProvider(): FootballDataProvider {
  const providerName = (env.footballProvider ?? 'mock').toLowerCase()

  if (providerName === 'live' && env.footballApiKey && env.footballApiBaseUrl) {
    return new RestFootballDataProvider(env.footballApiKey, env.footballApiBaseUrl)
  }

  return new MockFootballDataProvider()
}
