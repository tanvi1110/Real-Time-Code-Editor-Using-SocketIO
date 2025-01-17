import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
import ACTIONS  from './src/Action.js'

const server = createServer(app)

const io = new Server(server)

app.use(express.static('dist'))


const userSocketMap = {}
function getAllConnectedClients(roomId) {
    //map ll return, and we ll convert to array 
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
      return {
          socketId,
          username: userSocketMap[socketId]
      }
    })
}

io.on('connection', (socket) => {
    console.log('socket connected' , socket.id)

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
     userSocketMap[socket.id] = username
     socket.join(roomId)
     const clients = getAllConnectedClients(roomId)       
     clients.forEach(({socketId}) => {
         io.to(socketId).emit(ACTIONS.JOINED, {
            clients, 
            username,
            socketId: socket.id
         }) 
      })
    })

    socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
      console.log('reciebing', code)
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code})      
    })

    socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) => {
          io.to(socketId).emit(ACTIONS.CODE_CHANGE, {code})      
      })


    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms]
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            })
        })
       
        delete userSocketMap[socket.id]
        socket.leave()
    })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`listeing on port ${PORT}`))



