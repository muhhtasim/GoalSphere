import http from 'node:http'
import app from './app'
import { connectDatabase } from './config/db'
import { env } from './config/env'
import { initSocketServer } from './socket'

async function startServer(): Promise<void> {
  try {
    await connectDatabase()

    const server = http.createServer(app)
    initSocketServer(server)

    server.listen(env.port, () => {
      console.log(`GoalSphere API running on http://localhost:${env.port}`)
    })
  } catch (error) {
    console.error('Failed to start API server:', error)
    process.exit(1)
  }
}

startServer()
