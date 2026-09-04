import { Router } from 'express'
import { followService } from '../services/followService'
import { personalizedFeedService } from '../services/personalizedFeedService'
import { getFootballDataProvider } from '../providers/footballDataProvider'

const router = Router()
const provider = getFootballDataProvider()

router.get('/feed/personalized/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const liveMatches = await provider.getLiveMatches()
    const upcomingMatches = await provider.getFixtures()
    const news = await provider.getNews()
    const popularMatches = [...liveMatches, ...upcomingMatches].slice(0, 8)

    const teamFollows = await followService.getEntityIdsByType(userId, 'team')
    const playerFollows = await followService.getEntityIdsByType(userId, 'player')
    const leagueFollows = await followService.getEntityIdsByType(userId, 'league')

    const ranked = personalizedFeedService.buildFeed({
      userId,
      liveMatches,
      upcomingMatches,
      news,
      popularMatches,
      followableMatches: [...liveMatches, ...upcomingMatches],
      teamFollows,
      playerFollows,
      leagueFollows,
    })

    res.json({ data: ranked })
  } catch (error) {
    next(error)
  }
})

router.post('/follows/:userId', async (req, res) => {
  const { entityType, entityId } = req.body as { entityType?: 'team' | 'player' | 'league'; entityId?: string }

  if (!entityType || !entityId) {
    return res.status(400).json({ message: 'entityType and entityId are required' })
  }

  const record = await followService.follow(req.params.userId, entityType, entityId)
  return res.status(201).json({ data: record })
})

router.delete('/follows/:userId', async (req, res) => {
  const { entityType, entityId } = req.body as { entityType?: 'team' | 'player' | 'league'; entityId?: string }

  if (!entityType || !entityId) {
    return res.status(400).json({ message: 'entityType and entityId are required' })
  }

  const removed = await followService.unfollow(req.params.userId, entityType, entityId)
  return res.json({ data: { removed } })
})

router.get('/follows/:userId', async (req, res) => {
  const follows = await followService.getUserFollows(req.params.userId)
  res.json({ data: follows })
})

export default router
