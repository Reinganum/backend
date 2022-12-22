const express = require('express')
const {engine} = require('express-handlebars') 
const session=require('express-session')
const app=express()
const PORT=8080
const router=require('./routers/index')
const Mongostore=require('connect-mongo')
const advancedOptions={useNewUrlParser:true,useUnifiedTopology:true}
const User=require('./crud/mongoCRUD')
app.use(session({
    store:Mongostore.create({
        //mongoUrl:'mongodb+srv://harijanF:NGC654e.@cluster0.mdmbmnr.mongodb.net/?retryWrites=true',
        mongoUrl:'mongodb://localhost:27017',
        mongoOptions:advancedOptions,
        ttl:60,
        collectionName:'sessions'
    }),
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    cookie : {
        maxAge: 60000
    }
}))

app.use('/', router)
app.listen(PORT, ()=>{
    console.log(`el servidor esta escuchando en el puerto ${PORT}`)
})
app.use(express.urlencoded({extended:false}))
app.engine('.hbs', engine({
    extname:'.hbs'
}));
app.set('views', './views');
app.set('view engine', '.hbs');
app.use(express.static('views'));

User.save({name:"hari"})