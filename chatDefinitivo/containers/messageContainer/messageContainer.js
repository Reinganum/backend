const {knexSqlite3} = require('../connect');
const DbCRUD = require('../dbCRUD')

const msgDatabase=new DbCRUD(knexSqlite3,'msgdatabase')
msgDatabase.newTable('socketID','msg','time')


module.exports = msgDatabase