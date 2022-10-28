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
    async getById(socketID){
        let items=await this.getAll()
        return items.find(item=>(item.socketID)===(socketID))
    }
    async updateById(newData,id){
        let items=await this.getAll()
        const itemIndex=items.findIndex((item)=>item.id==id)
        if(itemIndex===-1)return {error:true}
        items[itemIndex].nickname=newData.name;
        await fs.promises.writeFile(this.file,JSON.stringify(items))
    }
    async deleteById(id){
        let items=await this.getAll()
        const updatedItems=items.filter((item)=>{return item.id!=id})
        await fs.promises.writeFile(this.file,JSON.stringify(updatedItems))
    }
}

module.exports=ContainerMemory;