const { knexSql } = require('../connect');
const DbCRUD = require('../dbCRUD');

const productDatabase=new DbCRUD(knexSql,'newProducts')
productDatabase.newTable('title','price','thumbnail')

module.exports=productDatabase