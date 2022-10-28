
const express = require('express')
const path = require('path')
const {Server:HttpServer}=require('http')
const {Server: SocketIOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})

const ItemsContainer=require('./containers/productContainer/productContainer')

// require handlers
const {newUser,changeUser} = require('./handlers/userHandler')
const {newMessage} = require('./handlers/messageHandler')
const {newItem}=require('./handlers/itemHandler')
// websockets

io.on('connection', async (socket)=>{
    newUser(socket,io)

    socket.on('msg',(newMsg)=>{
        newMessage(socket,io,newMsg)
    })

    socket.on('change-user',(newName)=>{
        changeUser(socket,io,newName)
    })

    socket.emit('items', await ItemsContainer.getAll())

    socket.on('typing',(user)=>{
        socket.broadcast.emit('typing',user)
    })
    socket.on('newItem',(itemData)=>{
        newItem(socket,io,itemData)
    })
})