const router=require('express').Router()
const {main, forget, logUsername}=require('../handlers/sessionHandler')
const bodyParser=require('body-parser')
const urlencodedParser=bodyParser.urlencoded({extended:false})

router.post('/',urlencodedParser,logUsername)
router.get('/',main)
router.get('/forget',forget)
router.get('/login', (req,res)=>{
    res.render('input')
})

module.exports=router