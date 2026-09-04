import { io } from 'socket.io-client'

const socketUrl = import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:4000'

export const socket = io(socketUrl, {
  transports: ['websocket'],
  autoConnect: false,
})

export function connectLiveSocket() {
  if (!socket.connected) {
    socket.connect()
  }
}

export function disconnectLiveSocket() {
  socket.disconnect()
}
