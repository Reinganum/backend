const express= require('express')
const PORT=process.argv[2]||8081
const app=express()
const router=express.Router()
const cluster=require('cluster')
const cpus=require('os').cpus()
const randomNum=require('./factory/random')

router.get('/randoms',(req,res)=>{
    if (req.query.cant) {
        res.send(randomNum(req.query.cant)) 
    } else {
        res.send(randomNum(500000000))
        console.log("este proceso lo hizo "+ process.pid)
    }
})

router.get('/info',(req,res)=>{
    const fecha=new Date().toLocaleDateString()
    res.send(`Servidor express en (${PORT}) - PID (${process.pid}) - numero de CPUs: ${cpus.length}`)
})

app.use('/api',router)
app.listen(PORT,()=>{
    console.log(`SERVIDOR ON ${PORT} - PDI ${process.pid}`)
})