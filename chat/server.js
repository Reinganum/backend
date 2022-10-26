const express = require('express');
const {Server: HttpServer}=require('http');
const { Server: SocketIOServer }  = require('socket.io')
const PORT = process.env.PORT || 8080;
const app=express();
app.use(express.static('public'));
const httpServer=new HttpServer(app)
const io = new SocketIOServer(httpServer)

const {newMessage} = require('./handlers/messages.handler')
const newItem=require('./handlers/items.handler')

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

httpServer.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`)
})


io.on('connection',(socket)=>{
    socket.on('newMsg', newMsg=>{
        console.log(`${newMsg}`);
        newMessage(socket,io,newMsg)
   })
});











