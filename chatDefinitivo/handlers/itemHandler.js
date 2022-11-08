const Items = require('../containers/productContainer/productContainer')
const productDatabase=require('../containers/productContainer/productContainer')


const newProduct=async(socket,io,newItem)=>{
    productDatabase.save(newItem)
    .then(rowId=>{
        productDatabase.getAll()
        .then(allItems=>{io.sockets.emit('items',allItems)})
    })
    .catch(error=>{console.log(error)})
}

module.exports={
    newProduct
}