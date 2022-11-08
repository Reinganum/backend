class DbCRUD{
    constructor(connection,table) {
        this.connection=connection;
        this.table=table;
    }
    async newTable(param2,param3,param4){
        this.connection.schema.createTable(this.table, function(table) {
            table.increments("id")
            table.string(param2)
            table.string(param3)
            table.string(param4)
          })
          .then(result=>console.log(`table ${this.table} created successfully`))
          .catch(error=>console.log(`error: ${error}`))
    }
    async getAll(){
        return this.connection(this.table).select("*")
    }
    async save(obj){
        return this.connection(this.table).insert(obj)
    }
    async getById(id){
       return this.connection(this.table).where("id",id).select()
    }
    async deleteById(id){
        return this.connection(this.table).where("id",id).del();
    }
    async updateById(id,obj){
        return this.connection(this.table).where("id",id).update(obj);
    }
}

module.exports=DbCRUD