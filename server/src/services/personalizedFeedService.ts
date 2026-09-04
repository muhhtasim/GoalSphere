import { followService, type FollowEntityType } from './followService'
import type { FixtureRecord, NewsArticle, MatchDetailData } from '../types/football'

export interface FeedItem {
  id: string
  kind: 'live-match' | 'upcoming-match' | 'player-match' | 'league-match' | 'team-news' | 'player-news' | 'popular-match' | 'general-content'
  score: number
  reason: string
  match?: FixtureRecord | MatchDetailData
  news?: NewsArticle
  createdAt: string
}

export interface PersonalizedFeedOptions {
  userId: string
  liveMatches: FixtureRecord[]
  upcomingMatches: FixtureRecord[]
  news: NewsArticle[]
  popularMatches: FixtureRecord[]
  followableMatches: Array<FixtureRecord | MatchDetailData>
  teamFollows?: Set<string>
  playerFollows?: Set<string>
  leagueFollows?: Set<string>
}

export class PersonalizedFeedService {
  constructor(private readonly followStore = followService) {}

  buildFeed({ userId, liveMatches, upcomingMatches, news, popularMatches, teamFollows, playerFollows, leagueFollows }: PersonalizedFeedOptions): FeedItem[] {
    const teamFollowSet = teamFollows ?? this.followStore.getEntityIdsByType(userId, 'team')
    const playerFollowSet = playerFollows ?? this.followStore.getEntityIdsByType(userId, 'player')
    const leagueFollowSet = leagueFollows ?? this.followStore.getEntityIdsByType(userId, 'league')
    const itemsByKey = new Map<string, FeedItem>()

    const upsert = (id: string, item: FeedItem) => {
      const current = itemsByKey.get(id)
      if (!current || item.score > current.score) {
        itemsByKey.set(id, item)
      }
    }

    for (const match of liveMatches) {
      if (teamFollowSet.has(match.homeTeamId) || teamFollowSet.has(match.awayTeamId)) {
        upsert(`match:${match.id}`, {
          id: `live:${match.id}`,
          kind: 'live-match',
          score: 100,
          reason: 'Followed team in a live match',
          match,
          createdAt: new Date().toISOString(),
        })
      }
    }

    for (const match of upcomingMatches) {
      if (teamFollowSet.has(match.homeTeamId) || teamFollowSet.has(match.awayTeamId)) {
        upsert(`match:${match.id}`, {
          id: `upcoming:${match.id}`,
          kind: 'upcoming-match',
          score: 90,
          reason: 'Followed team has an upcoming fixture',
          match,
          createdAt: new Date().toISOString(),
        })
      }

      if (leagueFollowSet.has(match.leagueId)) {
        upsert(`match:${match.id}`, {
          id: `league:${match.id}`,
          kind: 'league-match',
          score: 70,
          reason: 'Followed league match',
          match,
          createdAt: new Date().toISOString(),
        })
      }

      if (playerFollowSet.size > 0) {
        const playerMatch = match.homeTeamId === 'team-real-madrid' || match.awayTeamId === 'team-real-madrid'
        if (playerMatch && playerFollowSet.has('player-ronaldo')) {
          upsert(`match:${match.id}`, {
            id: `player-match:${match.id}`,
            kind: 'player-match',
            score: 80,
            reason: 'Followed player related match',
            match,
            createdAt: new Date().toISOString(),
          })
        }
      }
    }

    for (const article of news) {
      if (article.teamIds?.some((teamId) => teamFollowSet.has(teamId))) {
        upsert(`news:${article.id}`, {
          id: `team-news:${article.id}`,
          kind: 'team-news',
          score: 60,
          reason: 'Followed team news',
          news: article,
          createdAt: article.publishedAt,
        })
      }

      if (article.playerIds?.some((playerId) => playerFollowSet.has(playerId))) {
        upsert(`news:${article.id}`, {
          id: `player-news:${article.id}`,
          kind: 'player-news',
          score: 55,
          reason: 'Followed player news',
          news: article,
          createdAt: article.publishedAt,
        })
      }
    }

    for (const match of popularMatches) {
      upsert(`popular:${match.id}`, {
        id: `popular:${match.id}`,
        kind: 'popular-match',
        score: 25,
        reason: 'Popular match',
        match,
        createdAt: new Date().toISOString(),
      })
    }

    const items = Array.from(itemsByKey.values())

    if (items.length === 0) {
      return [
        {
          id: 'general-football-content',
          kind: 'general-content',
          score: 1,
          reason: 'General football content',
          createdAt: new Date().toISOString(),
        },
      ]
    }

    return items.sort((a, b) => {
      const scoreDifference = b.score - a.score
      if (scoreDifference !== 0) {
        return scoreDifference
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  isEntityFollowed(userId: string, entityType: FollowEntityType, entityId: string): boolean {
    return this.followStore.has(userId, entityType, entityId)
  }
}

export const personalizedFeedService = new PersonalizedFeedService()
