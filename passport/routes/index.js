const express=require('express')
const router=express.Router()
const checkAuthenticated=require('../passport/auth')
const cpus=require('os').cpus()
const {fork}=require('child_process')
const compression = require('compression')

// INDEX

router.get('/', (req,res)=>{
    res.render('index')
})

router.get('/greeting', checkAuthenticated,(req,res)=>{
    res.render('greeting', {name:req.user.username})
})


// INFORMACION EXTRAIDA DE ARGUMENTOS Y PROCESS
const info={
    "argumentos":process.argv.slice(2), 
    "memory (rss)":process.memoryUsage().rss,
    "sistema operativo":process.platform, 
    pid:process.pid,
     "node version":process.version,
    "ruta archivo":process.argv[1],
    "carpeta root":process.cwd(),
    "NUMERO DE CPUS": `${cpus.length}`
}

// RUTA CON Y SIN GZIP 

// peso sin Gzip: 561 B
// peso con Gzip: 541 B

router.get('/info',(req,res)=>{
    const child=fork('./factory/info.js')
    child.send('getInfo')
    child.on('message',(result)=>{
        // para metricas sin console.log
        // console.log(result)
        res.status(200).send(result)
    })
})

router.get('/infoGzip',compression(),(req,res)=>{
    res.status(200).send(info)
})


module.exports=router;