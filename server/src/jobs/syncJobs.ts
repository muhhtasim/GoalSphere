import cron from 'node-cron'
import { env } from '../config/env'
import { getFootballDataProvider } from '../providers/footballDataProvider'
import { FootballSyncService } from '../services/footballSyncService'
import { startLiveMatchPolling } from '../services/liveMatchPollingService'

export function startSyncJobs(): void {
  const provider = getFootballDataProvider()
  const syncService = new FootballSyncService(provider)

  startLiveMatchPolling()

  const liveIntervalSeconds = Math.max(10, env.liveSyncIntervalSeconds || 30)
  console.log(`Sync jobs started with ${liveIntervalSeconds}s live polling.`)

  cron.schedule('0 */2 * * *', async () => {
    await syncService.syncStandings()
  })

  cron.schedule('0 0 * * *', async () => {
    await Promise.all([
      syncService.syncFixtures(),
      syncService.syncResults(),
      syncService.syncNews(),
    ])
  })
}
