
const DbCRUD = require('../dbCRUD');
const Container=require('../containerMemory')

/*const productDatabase=new DbCRUD(knexSql,'newProducts')
productDatabase.newTable('title','price','thumbnail')
*/

const productDatabase=new Container("prod")

module.exports=productDatabase