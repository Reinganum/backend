const express=require('express');
const router=require('./routes/index')
const userRouter=require('./routes/users')
const apiRouter=require('./routes/api')
const app=express();
const {engine} = require('express-handlebars')
const mongoose=require('mongoose') 
const keys=require('./config/keys')
const session=require('express-session')
const Mongostore=require('connect-mongo')
const advancedOptions={useNewUrlParser:true,useUnifiedTopology:true}
const passport=require('passport')
const strategy=require('./passport/strategy')
require('dotenv').config({path:'./.env'})

// MINIMIST (SE PUEDE ESCOGER PUERTO O CORRER CON SCRIPT TEST EN PUERTO 3000)

const parseArgs = require('minimist');
const { MongoURI } = require('./config/keys');

const options={
    alias:{
        p:'port'
    } 
}
const arg=parseArgs(process.argv.slice(2),options)
const PORT=arg.p||8080;


// strategy

strategy(passport)

// HANDLEBARS

app.use(express.urlencoded({extended:false}))
app.engine('.hbs', engine({
    extname:'.hbs'
}));
app.set('views', './views');
app.set('view engine', '.hbs');
app.use(express.static('views'));

// BODY PARSER

app.use(express.urlencoded({extended:false}))

// SESSION 

console.log(process.env.MongoURI)

app.use(session({
    store:Mongostore.create({
        mongoUrl:process.env.MongoURI,
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

app.use(passport.initialize());
app.use(passport.session());

// CONECCTION TO MONGO 

const db=keys.MongoURI;
mongoose.connect(db)
.then(()=>console.log('Connected to MongoDB'))
.catch((e)=>console.log(`failed to connect ${e}`))

app.use('/', router)
app.use('/user', userRouter)
app.use('/api',apiRouter)
app.listen(PORT, ()=>console.log(`server running on: ${PORT}`))
