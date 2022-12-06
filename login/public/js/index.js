console.log("script connected")
const button = document.getElementById('redirect')
const username=document.getElementById('username')

button.addEventListener('click',(e)=>{
    console.log(username.value)
    location.href=`http://localhost:8080/session/root?name=${username.value}`
})