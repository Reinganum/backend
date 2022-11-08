const sqlConfig = {
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:'',
        database:'products'
    }
}

const knexSql=require('knex')(sqlConfig)

const sqliteConfig = {
	client: 'sqlite3',
	connection: {
		filename:'./db/db.sqlite'
	}
}

const knexSqlite3=require('knex')(sqliteConfig)

module.exports={knexSql,knexSqlite3}

