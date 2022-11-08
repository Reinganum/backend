const msgDatabase=require('../containers/messageContainer/messageContainer')


const newMessage=async(socket,io,newMsg)=>{
    let currentDate = new Date();
    let timestamp = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    msgDatabase.save({socketId:`${socket.id}`,msg:`${newMsg}`,time:`${timestamp}`})
    .then(()=>msgDatabase.getAll())
    .then((allMsgs)=>io.sockets.emit('allMsgs', allMsgs))
}




module.exports={newMessage}