const router=require('express').Router()
const {main, forget, logUsername,register}=require('../handlers/sessionHandler')
const bodyParser=require('body-parser')
const urlencodedParser=bodyParser.urlencoded({extended:false})

// INDEX

router.post('/',urlencodedParser,logUsername)
router.get('/',main)

// LOGIN
router.get('/login', (req,res)=>{
    res.render('login')
})
router.post('/login',(req,res)=>{

})

// REGISTER

router.get('/register',register)
router.post('/register',(req,res)=>{

})

// LOGOUT

router.get('/logout',forget)

module.exports=router