import type { Server as HttpServer } from 'node:http'
import { Server, type Socket } from 'socket.io'
import { env } from './config/env'

let io: Server | undefined

export function initSocketServer(httpServer: HttpServer): Server {
  if (io) {
    return io
  }

  io = new Server(httpServer, {
    cors: {
      origin: env.corsOrigin,
      credentials: true,
    },
  })

  io.on('connection', (socket: Socket) => {
    socket.emit('live:status', {
      connected: true,
      timestamp: new Date().toISOString(),
    })

    socket.on('live:subscribe', (matchId?: string) => {
      if (matchId) {
        void socket.join(`match:${matchId}`)
      }
    })
  })

  return io
}

export function getSocketServer(): Server | undefined {
  return io
}

export function emitLiveMatchUpdate(payload: Record<string, unknown>): void {
  if (!io) {
    return
  }

  io.emit('live:matches', payload)
}
