const fs = require('fs')
const express = require('express');
const app=express()
const PORT=process.env.PORT || 8080;

const server=app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/public", express.static("public"));

const router= require("./routes/router")
app.use("/api/Products", router)

// trae todos los productos

router
.get('/',(req,res)=>{
    contenedor.getAll()
    .then(productos=>{
        res.json(productos)
    })
})

// trae producto por parametro de id
.get('/:id',(req,res)=>{
    const idProducto=parseInt(req.params.id)
    contenedor.getById(idProducto)
    .then(prod=>{
        res.json(prod)
    })
})

// agrega producto al array de productos
.post('/',(req,res)=>{
    const producto=(req.body)
    contenedor.save(producto)
    .then(prod=>{
        res.json(prod)
    }) 
})

// recibe producto y actualiza segun id 
.put('/:id',(req,res)=>{
    const idProducto=parseInt(req.params.id)
    const actualizacion=(req.body) 
    contenedor.modifyObj(idProducto,actualizacion)
    .then(prod=>{
        res.json(prod)
    })
})

// borra un elemento segun id 
.delete('/:id',(req,res)=>{
    const idProducto=parseInt(req.params.id)
    contenedor.deleteById(idProducto)
    .then(prod=>{
        res.json(prod)
    })
})
.post('/form',(req,res)=>{
    const actualizacion=(req.body) 
    res.json(actualizacion)
})