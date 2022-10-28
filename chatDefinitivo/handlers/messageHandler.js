const Messages=require('../containers/messageContainer/messageContainer')

const newMessage=async(socket,io,newMsg)=>{
    let currentDate = new Date();
    let timestamp = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    await Messages.save({socketID:socket.id,msg:newMsg,time:timestamp})
    const allMsgs = await Messages.getAll()
    io.sockets.emit('allMsgs', allMsgs)
}

module.exports={newMessage}