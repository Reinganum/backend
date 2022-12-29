const express= require('express')
const cluster=require('cluster')
const cpus=require('os').cpus()
const nuevoRouter=express.Router()
const randomNum=require('./factory/random')
const app=express()
nuevoRouter.get('/randoms',(req,res)=>{
    if (req.query.cant) {
        res.send(randomNum(req.query.cant)) 
    } else {
        res.send(randomNum(500000000))
        console.log("este proceso lo hizo "+ process.pid)
    }
})
app.use('/api',nuevoRouter)
if(cluster.isPrimary){
    const lengthCpu=cpus.length
    for (let index = 0; index < lengthCpu; index++) {
        cluster.fork()
    }
}else{
    app.listen(8081,()=>{
        console.log(`SERVIDOR ON ${8081} - PID ${process.pid}`)
    })
}
