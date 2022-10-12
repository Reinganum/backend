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

const apiProductos= require("./routes/router")
app.use("/api/Products", apiProductos)

class Contenedor{
    name=""
    constructor(name){
        this.name=`./${name}.txt`;
    }
    create(){
        try{
            fs.writeFileSync(this.name, "[]")
        } catch (error){
            throw new Error (`error en la creacion del archivo${error.message}`)
        }
    }
    async save(obj){
        try{
            let arrProductos= await this.getAll()
            let nuevoId=arrProductos.length+1
            obj.id=nuevoId;
            arrProductos.push(obj)
            let nuevoArr=arrProductos
            await fs.promises.writeFile(this.name,JSON.stringify(nuevoArr))
            this.getAll()
        }
        catch{
            throw new Error (`error, no se pudo agregar objeto:`)
        }
    }
    async getById(buscarId){
        try{
            let arrProductos= await this.getAll()
            console.log(`buscando objeto con ID de: ${buscarId}`)
            let producto = arrProductos.find(x => x.id === buscarId)
            if(producto){
                return(producto);
            } else {
                return 'producto no encontrado'
            }
        }
        catch{
            throw new Error (`error en la lectura: ${error}`)
        }
    }
    async getAll() {
        try{
            const arr=await fs.promises.readFile(this.name,"utf-8")
            const arrProductos=JSON.parse(arr)
            return arrProductos;
        }
        catch (error) {
            throw new Error(`error en la lectura: ${error}`)
        }
    }
    async deleteById(buscarId){
        try{
            let arrProductos= await this.getAll()
            if (arrProductos.length===0){
                console.log("No hay objetos para borrar en el array")
            } else {
            let nuevoArr=arrProductos.filter((producto)=>{return producto.id!==buscarId})
                if(nuevoArr.length===arrProductos.length){
                    console.log("No se encontro un objeto con ese ID")
                } else {
                    console.log(`se elimino el objeto con ID: ${buscarId}`)
                    let arrFinal=nuevoArr.map((prod)=>{
                        if (prod.id<buscarId){
                            return prod;
                        } else {
                            prod.id=(prod.id-1)
                            return prod;
                        }
                    })
                    await fs.promises.writeFile(this.name,JSON.stringify(arrFinal))
                    return(arrFinal)
                }
            }
        }
        catch{
            throw new Error(`error en la lectura: `)
        }
    }
    async deleteAll(){
        try{
            this.create(this.name)
        }
        catch{

        }
    }
    async modifyObj(id, newObj){
        try{
            let arrProductos= await this.getAll()
            let nuevoArr = arrProductos.splice((id-1),1,newObj)
            await fs.promises.writeFile(this.name,JSON.stringify(arrProductos))
            return arrProductos
        }
        catch{
            throw new Error(`error en la lectura: ${error}`)
        }
    }
}

const contenedor = new Contenedor("apiREST");
contenedor.create()
const nuevoProducto = {title: "Jason y los argonautas", price: 5000}
const nuevoProducto2 = {title: "El laberinto del minotauro", price: 7000}
const nuevoProducto3 = {title: "El anillo de los nibelungos", price: 8000}

function addProduct(){
    contenedor.save(nuevoProducto)
}
function addProduct2(){
    contenedor.save(nuevoProducto2)
}
function addProduct3(){
    contenedor.save(nuevoProducto3)
}

setTimeout(addProduct)
setTimeout(addProduct2,300)
setTimeout(addProduct3,600)

// trae todos los productos

server.on("error", error=>console.log(`error en el servidor ${error}`))
app.get('/api/productos',(req,res)=>{
    contenedor.getAll()
    .then(productos=>{
        res.json(productos)
    })
})

// trae producto por parametro de id

app.get('/api/productos/:id',(req,res)=>{
    const idProducto=parseInt(req.params.id)
    contenedor.getById(idProducto)
    .then(prod=>{
        res.json(prod)
    })
})

// agrega producto al array de productos

app.post('/api/productos/',(req,res)=>{
    const producto=(req.body)
    contenedor.save(producto)
    .then(prod=>{
        res.json(prod)
    }) 
})

// recibe producto y actualiza segun id 

app.put('/api/productos/:id',(req,res)=>{
    const idProducto=parseInt(req.params.id)
    const actualizacion=(req.body) 
    contenedor.modifyObj(idProducto,actualizacion)
    .then(prod=>{
        res.json(prod)
    })
})

// borra un elemento segun id 

app.delete('/api/productos/:id',(req,res)=>{
    const idProducto=parseInt(req.params.id)
    contenedor.deleteById(idProducto)
    .then(prod=>{
        res.json(prod)
    })
})

app.post('/api/form',(req,res)=>{
    const actualizacion=(req.body) 
    res.json(actualizacion)
})





