import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') })

dotenv.config()

const parseOrigins = (value?: string): string[] =>
  (value ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

export const env = {
  port: Number(process.env.PORT ?? '4000'),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongoUri: process.env.MONGODB_URI ?? '',
  jwtSecret: process.env.JWT_SECRET ?? 'development-secret',
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN),
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? '900000'),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? '100'),
  liveSyncIntervalSeconds: Number(process.env.LIVE_SYNC_INTERVAL_SECONDS ?? '30'),
  liveSyncIdleIntervalSeconds: Number(process.env.LIVE_SYNC_IDLE_INTERVAL_SECONDS ?? '120'),
  footballApiKey: process.env.FOOTBALL_API_KEY ?? '',
  footballApiBaseUrl: process.env.FOOTBALL_API_BASE_URL ?? '',
  footballProvider: process.env.FOOTBALL_PROVIDER ?? 'mock',
  footballRateLimitPerMinute: Number(process.env.FOOTBALL_RATE_LIMIT_PER_MINUTE ?? '60'),
  footballRequestIntervalMs: Number(process.env.FOOTBALL_REQUEST_INTERVAL_MS ?? '1500'),
}
