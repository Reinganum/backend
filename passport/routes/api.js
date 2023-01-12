const router=require('express').Router()
const {fork}=require('child_process')
const parseArgs = require('minimist');

const options={
    alias:{
        p:'port',
        m:'mode' // fork o cluster
    } 
}
const arg=parseArgs(process.argv.slice(2),options);
const mode=arg.m;

console.log(`el servidor se ha inicializado en modo: ${mode==="cluster"?mode:"fork"}`)

router.get('/randoms', (req,res)=>{
    if(mode==="cluster"){
        res.redirect(('http://localhost:8081/api/randoms'))
    } /* 
    CHILD PROCESS RANDOMS DESACTIVADA
    else {
        
        const child=fork('./factory/random.js')
        if (req.query.cant){
            child.send(req.query.cant);
        } else {
            child.send('start')
        }
        child.on('message',(nums)=>{
            res.send({"numeros aleatorios generados en FORK":nums})
            
        }) 
        */
    })
    



module.exports=router;