const Items = require('../containers/productContainer/productContainer')

const newItem=async(socket, io, newItem)=>{
    await Items.save(newItem)
    const allItems=await Items.getAll()
    io.sockets.emit('items',allItems)
}

module.exports={
    newItem
}