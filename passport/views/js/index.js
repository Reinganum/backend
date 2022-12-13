console.log("script connected")
const button = document.getElementById('redirect')

button.addEventListener('click',()=>{
    location.href='http://localhost:8080/user/logout'
})

function volverLogin(){
    console.log("function called")
    setTimeout(() => {
        location.href='http://localhost:8080/'
    }, 2000);
}