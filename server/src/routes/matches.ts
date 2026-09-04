import { Router } from 'express'
import { getFootballDataProvider } from '../providers/footballDataProvider'

const router = Router()
const provider = getFootballDataProvider()

router.get('/matches/live', async (_req, res, next) => {
  try {
    const data = await provider.getLiveMatches()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/matches/upcoming', async (_req, res, next) => {
  try {
    const data = await provider.getFixtures()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/matches/results', async (_req, res, next) => {
  try {
    const data = await provider.getResults()
    res.json({ data })
  } catch (error) {
    next(error)
  }
})

router.get('/matches/:id', async (req, res, next) => {
  try {
    const data = await provider.getMatchDetails(req.params.id)
    if (!data) {
      return res.status(404).json({ message: 'Match not found' })
    }

    return res.json({ data })
  } catch (error) {
    return next(error)
  }
})

export default router
