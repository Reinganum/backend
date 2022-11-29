const {Router}=require('express')
const router = Router()
const mockProducts=require('../handlers/mockHandler')

router.get('/', (req,res)=>{
    const products=mockProducts()
    res.send(products)
})

module.exports=router