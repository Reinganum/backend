const socket=io('http://localhost:8080')

let messages=[];
let users=[];
let products=[];

// ELEMENTOS DEL DOM

//CHAT

let chatWindow=document.getElementById('chat-window')
let sendBtn=document.getElementById('send');
let message=document.getElementById('message');
let nickname=document.getElementById('nickname');
let nicknameBtn=document.getElementById('nicknameBtn');
let chatEvents=document.getElementById('chat-events')


// PRODUCTS

let title=document.getElementById('title')
let price=document.getElementById('price')
let thumbnail=document.getElementById('thumbnail')
let submitItem=document.getElementById('submitItem')

// EVENTOS SUBMIT PRODUCT

submitItem.addEventListener('click', (e)=>{
    e.preventDefault();
    let newItem={title:title.value,price:price.value,thumbnail:thumbnail.value}
    socket.emit('newItem', newItem)
})

// FUNCION RENDERIZAR TABLA

const displayItemTable=async(items)=>{
    const template = await fetch("views/items-table.hbs");
    const templateText = await template.text();
    const templateCompiled = Handlebars.compile(templateText);
    return templateCompiled({ items });
}

socket.on("items", async (items) => {
    const template = await displayItemTable(items);
    document.getElementById("itemsContainer").innerHTML = template;
  });

sendBtn.addEventListener('click', ()=>{
    let msg=(message.value);
    socket.emit('msg', msg)
})

message.addEventListener('keypress',()=>{
    socket.emit('typing', nickname.value)
})

socket.on('typing',(data)=>{
    chatEvents.innerHTML=`${data} is writing a message`
    setTimeout(()=>{
        chatEvents.innerHTML=''
    },2000)
})


socket.on('allMsgs', allMsgs => {
    clear()
    messages = allMsgs
    for (msg of allMsgs){
        paintMsg(msg)
        }
    })

const clear=()=>{
    chatWindow.innerHTML=''
}


nicknameBtn.addEventListener('click', (e)=>{
    if (!nickname.value || nickname.value===''){
        e.preventDefault()
    } else{
        let newName=nickname.value;
        let nameData={socketID:socket.id,name:newName}
        socket.emit('change-user',nameData)
        message.removeAttribute('class','hidden')
        sendBtn.removeAttribute('class','hidden')
        nicknameBtn.setAttribute('class','hidden')
        nickname.setAttribute('class','hidden')
    }
})

socket.on('allUsers', allUsers => {
    users = allUsers
    allMsgs=messages;
    clear()
    for (msg of allMsgs){
        paintMsg(msg)
    }
  })


  // sustitucion conseguir user 
const getNameBySocketId =(socket) =>{
    let foundUser=users.find((user)=>{return user.socketID===socket})
    if (foundUser)
    if (foundUser.nickname===null)
        return foundUser.socketID
    else return foundUser.nickname
}

// nuevo render

const paintMsg = (msg) => {
    const msgClass = (msg.socketID === socket.id) ? "ownMsg" : "othersMsg"
    let userNickname=getNameBySocketId(msg.socketID)
    const chatOwnerContent = (msg.socketID === socket.id) ? "Me" : userNickname
    const chatMsg = document.createElement("div")
    const chatOwner = document.createElement("p")
    const chatDate = document.createElement("p")
    chatMsg.classList.add(msgClass)
    chatOwner.classList.add('nickname')
    chatDate.classList.add('time')
    chatOwner.innerHTML = chatOwnerContent
    chatDate.innerHTML = msg.time
    chatMsg.appendChild(chatOwner)
    chatMsg.innerHTML = chatMsg.innerHTML + msg.msg
    chatMsg.appendChild(chatDate)
    chatWindow.appendChild(chatMsg)
  }

  