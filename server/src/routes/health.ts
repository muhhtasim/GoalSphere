import { Router } from 'express'

const router = Router()

router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'GoalSphere API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? 'development',
  })
})

export default router
