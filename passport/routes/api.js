const router=require('express').Router()
const {fork}=require('child_process')

router.get('/random', (req,res)=>{
    const child=fork('./factory/random.js')
    if (req.query.cant){
        child.send(req.query.cant);
    } else {
        child.send('start')
    }
    child.on('message',(nums)=>{
        res.send({"numeros aleatorios":nums})
    })
})



module.exports=router;