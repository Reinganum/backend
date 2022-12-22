const express=require('express')
const router=express.Router()
const checkAuthenticated=require('../passport/auth')

router.get('/', (req,res)=>{
    res.render('index')
})

router.get('/greeting', checkAuthenticated,(req,res)=>{
    res.render('greeting', {name:req.user.username})
})

// INFORMACION EXTRAIDA DE ARGUMENTOS Y PROCESS

router.get('/info',(req,res)=>{
    res.send({
        "argumentos":process.argv.slice(2), 
        "memory (rss)":process.memoryUsage().rss,
        "sistema operativo":process.platform, 
        pid:process.pid,
         "node version":process.version,
        "ruta archivo":process.argv[1],
        "carpeta root":process.cwd()})
})

const args = process.argv.slice(2)
console.log(args)

module.exports=router;