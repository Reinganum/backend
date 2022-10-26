const fs = require('fs')
const path = require('path')

class ContainerMemory{
    constructor(file) {
        try {
          this.file = path.join(process.cwd(), `./db/${file}.json`)
          fs.writeFileSync(this.file, '[]')
          } catch (error) {
            console.log(`Error en el constructor: ${error.message}`)
          }
      }
    async getAll() {
        try{
            const arr=await fs.promises.readFile(this.file,"utf-8")
            const arrObj=JSON.parse(arr)
            return arrObj;
        }
        catch (error) {
            throw new Error(`error en la lectura: ${error}`)
        }
    }
    async save(obj){
        try{
            let arrProductos= await this.getAll()
            let nuevoId=arrProductos.length+1
            obj.id=nuevoId;
            arrProductos.push(obj)
            let nuevoArr=arrProductos
            await fs.promises.writeFile(this.file,JSON.stringify(nuevoArr))
            this.getAll()
        }
        catch{
            throw new Error (`error, no se pudo agregar objeto:`)
        }
    }
}

module.exports=ContainerMemory;