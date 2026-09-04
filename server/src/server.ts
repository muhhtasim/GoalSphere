import app from './app'
import { connectDatabase } from './config/db'
import { env } from './config/env'

async function startServer(): Promise<void> {
  try {
    await connectDatabase()
    app.listen(env.port, () => {
      console.log(`GoalSphere API running on http://localhost:${env.port}`)
    })
  } catch (error) {
    console.error('Failed to start API server:', error)
    process.exit(1)
  }
}

startServer()
