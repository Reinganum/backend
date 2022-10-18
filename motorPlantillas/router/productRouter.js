import {Router} from 'express';
import { productApi } from '../src/api/productApi.js';
const productRouter=Router();

productRouter.get('/',(req,res)=>{
    const items=productApi.getAll()
    res.send({success:true,data:items})
})

productRouter.get('/:id',(req,res)=>{
    const {id}=req.params;
    const item=productApi.getById(Number(id))
    if (!item){
        res.send({success:false,data:undefined,message:"Item not found"})
    } else {
        res.send({success:true,item})
    }
})
productRouter.post('/',(req,res)=>{
    const {title, price, thumbnail}=req.body
    const item=productApi.save({title, price, thumbnail})
    res.send({success:true,data:{id:item.id}})
})

productRouter.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {title, price, thumbnail}=req.body
    const updatedItem = productApi.updateById(id,{title, price, thumbnail})
    res.send({success:true,update:updatedItem})
})

export {productRouter}
