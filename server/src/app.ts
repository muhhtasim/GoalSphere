import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import { env } from './config/env'
import { startSyncJobs } from './jobs/syncJobs'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import footballRoutes from './routes/football'
import healthRoutes from './routes/health'
import matchesRoutes from './routes/matches'

const app = express()

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
)
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  limit: env.rateLimitMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', apiLimiter)
app.use('/api', healthRoutes)
app.use('/api', footballRoutes)
app.use('/api', matchesRoutes)

app.get('/', (_req, res) => {
  res.json({ name: 'GoalSphere API', status: 'ready' })
})

startSyncJobs()

app.use(notFoundHandler)
app.use(errorHandler)

export default app
