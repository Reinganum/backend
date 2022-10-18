class ContainerMemory{
    constructor(){
        this.items=[]
    }
    getAll(){
        return this.items;
    }
    save(item){
        item.id=this.items.length===0 ? 1 : this.items[this.items.length-1].id + 1
        this.items.push(item)
        return item;
    }
    getById(id){
        return this.items.find(item=>(item.id)===(id))
    }
    updateById(id,newData){
        const itemIndex=this.items.findIndex((item)=>item.id==id)
        if(itemIndex===-1)return {error:true}
        this.items[itemIndex]={
            ...this.items[itemIndex],
            ...newData,
        }
        return this.items[itemIndex]
    }
    deleteById(id){
        const updatedItems=this.items.filter((item)=>{return item.id!=id})
        return updatedItems
    }
}


export {ContainerMemory};