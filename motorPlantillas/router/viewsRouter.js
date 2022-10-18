import { Router } from "express";
import { productApi } from "../src/api/productApi.js";

const viewsRouter = Router()

viewsRouter.get("/", (req,res)=>{
    res.render("form-products")
})

viewsRouter.post("/products",(req,res)=>{
    const {title,price,thumbnail}=req.body;
    productApi.save({title,price,thumbnail});
    res.redirect('/')
})

viewsRouter.get("/products", (req,res)=>{
    const items=productApi.getAll()
    res.render('table-products', {items: items})
})

export {viewsRouter}