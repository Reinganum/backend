const socket = io('http://localhost:8080')

socket.on('messages', data=>{
    console.log(data)
})

let messages=[];
let items=[];

// DOM

const itemForm=document.getElementById('itemForm')
const msgContainer=document.getElementById('msgContainer')
const chatForm=document.getElementById('chatForm')
const itemContainer=document.getElementById('itemContainer')

itemForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(itemForm)
    const formValues = Object.fromEntries(formData)
    socket.emit('newItem', formValues)
  })

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(chatForm)
    const formValues = Object.fromEntries(formData)
    socket.emit('newMsg', formValues.textMsg)
  })
  
const paintMsg=(msg)=>{
    let chatContainer = document.createElement("div")
    let chatMsg = document.createElement("p")
    let chatUser=document.createElement("p")
    let msgTime=document.createElement("p")
    msgTime.innerText=msg.time
    chatUser.innerText=msg.socketID;
    chatMsg.innerText=msg.msg;
    chatContainer.appendChild(chatUser)
    chatContainer.appendChild(chatMsg)
    chatContainer.appendChild(msgTime)
    msgContainer.appendChild(chatContainer)
}

const paintItem=()=>{

}

socket.on('allMsgs', allMsgs => {
    messages = allMsgs
    console.log(messages)
    for (msg of allMsgs){
        paintMsg(msg)
        }
    })

socket.on('allItems',allItems=>{
    items=allItems;
    console.log(items)
    renderItems(allItems)
})

