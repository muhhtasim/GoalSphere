import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') })

dotenv.config()

export const env = {
  port: Number(process.env.PORT ?? '4000'),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongoUri: process.env.MONGODB_URI ?? '',
  jwtSecret: process.env.JWT_SECRET ?? 'development-secret',
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? '900000'),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? '100'),
  liveSyncIntervalSeconds: Number(process.env.LIVE_SYNC_INTERVAL_SECONDS ?? '30'),
  footballApiKey: process.env.FOOTBALL_API_KEY ?? '',
  footballApiBaseUrl: process.env.FOOTBALL_API_BASE_URL ?? '',
  footballProvider: process.env.FOOTBALL_PROVIDER ?? 'mock',
}
