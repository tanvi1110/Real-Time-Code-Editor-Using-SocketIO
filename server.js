import express from 'express'
const app = express()
import { createServer } from 'http'
import { Server } from 'socket.io'

const server = createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
    console.log('socket connected' , socket.id)
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`listeing on port ${PORT}`))


Actions.js
const ACTIONS = {
    JOIN: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    SYNC_CODE: 'sync-code',
    LEAVE: 'leave'
}

module.exports = ACTIONS