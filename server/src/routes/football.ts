import { Router } from 'express'
import { getFootballDataProvider } from '../providers/footballDataProvider'

const router = Router()
const provider = getFootballDataProvider()

router.get('/football/leagues', async (_req, res, next) => {
  try {
    const data = await provider.getLeagues()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/football/teams', async (_req, res, next) => {
  try {
    const data = await provider.getTeams()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/football/live', async (_req, res, next) => {
  try {
    const data = await provider.getLiveMatches()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/football/fixtures', async (_req, res, next) => {
  try {
    const data = await provider.getFixtures()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/football/results', async (_req, res, next) => {
  try {
    const data = await provider.getResults()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/football/standings', async (_req, res, next) => {
  try {
    const data = await provider.getStandings()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/football/news', async (_req, res, next) => {
  try {
    const data = await provider.getNews()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

export default router
