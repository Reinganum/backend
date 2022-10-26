const Items=require('../clases/items/items')

const newItem=async(socket,io,newItem)=>{
    await Items.save(newItem)
    console.log(Items)
    const allItems=await Items.getAll()
    io.sockets.emit('allItems', allItems)
}

module.exports={newItem}