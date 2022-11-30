const msgDatabase=require('../containers/messageContainer/messageContainer')
const normalizr=require('normalizr');
const util=require('util');
const normalizar=normalizr.normalize;
const desnormalizar=normalizr.denormalize;

const getLength=(obj)=>{
    return JSON.stringify(obj).length
}

const mostrar=(objeto)=>{
    console.log(util.inspect(objeto,false,12,true))
}

const userSchema=new normalizr.schema.Entity('user');
const authorSchema=new normalizr.schema.Entity('chatUser',{author:userSchema})
const textSchema=new normalizr.schema.Entity('text');
const txt=new normalizr.schema.Entity('chatUser',{text:textSchema})
const msgSchema=new normalizr.schema.Entity('messages',{author:authorSchema},{text:txt})
const chatRoomSchema=new normalizr.schema.Entity('chatroom',{chatroom:[msgSchema]})


const newMessage=async(socket,io,newMsg)=>{
    let currentDate = new Date();
    let timestamp = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    msgDatabase.save(
        {id:`${socket.id}`,
            author:{
                id:`${socket.id}`,
                nombre:`${newMsg.author.nombre}`,
                apellido:`${newMsg.author.apellido}`,
                edad:`${newMsg.author.edad}`,
                alias:`${newMsg.author.alias}`,
                avatar:`${newMsg.author.avatar}`
            },
            text:`${newMsg.text}`
        }
        )
    .then(()=>msgDatabase.getAll())
    .then((allMsgs)=>{
    let messages={"id":"1","chatroom":allMsgs} 
    console.log(messages)
    let normalizedChatRoom=normalizar(messages,chatRoomSchema)
    let denormalizedChatRoom=desnormalizar(normalizedChatRoom.result,chatRoomSchema,normalizedChatRoom.entities)
    console.log('Normalizado: ', getLength(normalizedChatRoom))
    console.log('Desnormalizado: ', getLength(denormalizedChatRoom))
    console.log(`Normalizado se esta logrando una reduccion del ${(100-((getLength(normalizedChatRoom)*100)/getLength(denormalizedChatRoom)))}%`)
    {io.sockets.emit('allMsgs', normalizedChatRoom)
    }})
}
//MODELO DE MENSAJE QUE HAY QUE GENERAR
/*
{
	author:{
	id:
	nombre:
	apellido:
	edad:
	alias:
	avatar:
	},
	text:
}
*/
module.exports={newMessage}