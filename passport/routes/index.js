const express=require('express')
const router=express.Router()
const checkAuthenticated=require('../passport/auth')

router.get('/', (req,res)=>{
    res.render('index')
})

router.get('/greeting', checkAuthenticated,(req,res)=>{
    res.render('greeting', {name:req.user.username})
})

module.exports=router;