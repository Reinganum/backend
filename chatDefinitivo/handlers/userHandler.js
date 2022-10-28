const Users = require('../containers/userContainer/userContainer')
const Messages=require('../containers/messageContainer/messageContainer')

const newUser=async(socket,io)=>{
    console.log(`new connected user with socketID: ${socket.id}`)
    let currentDate = new Date();
    let timestamp = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    await Users.save({socketID:socket.id,nickname:null,time:timestamp})
    const allMsgs = await Messages.getAll()
    const allUsers = await Users.getAll()
    io.sockets.emit('allMsgs',allMsgs)
    io.sockets.emit('allUsers',allUsers)
}

const changeUser=async(socket,io,newName)=>{
    const user = await Users.getById(socket.id)
    const userID=user.id
    await Users.updateById(newName,userID) 
    const allUsers =await Users.getAll()
    io.sockets.emit('allUsers',allUsers)
}

const userDisconnected = async(socket,io)=>{
    const user = Users.getById(socket.id)
    const userID=user.id
    if (user)
    Users.deleteById(userID)
    const allUsers =await Users.getAll()
    io.sockets.emit('allUsers',allUsers)
}

module.exports = {newUser,changeUser,userDisconnected}