const express = require('express')
const fs = require('fs')
let router = express.Router()
module.exports = router

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

