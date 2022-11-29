const normalizr=require('normalizr')
const util=require('util')
const msgDatabase=require('../containers/messageContainer/messageContainer')

const normalizar=normalizr.normalize;

const authorSchema=new normalizr.schema.Entity('author')
const msgSchema=new normalizr.schema.Entity('text')
const chatSchema=new normalizr.schema.Entity('chat',[{
    author:{authorSchema},text:msgSchema
}])

const utils = (objeto) => {
	console.log(util.inspect(objeto, false, 12, true));
}

const newMessage=async(socket,io,newMsg)=>{
    let currentDate = new Date();
    let timestamp = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    msgDatabase.save(
        {
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
        const data_normalizada = normalizar(allMsgs, chatSchema);
        utils(data_normalizada)
        io.sockets.emit('allMsgs', allMsgs)
    })
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