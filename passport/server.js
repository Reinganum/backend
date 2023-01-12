const express=require('express')
const cookieParser=require('cookie-parser')
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
const logger = require('./config/logger')
const loggerWinston=require('./config/winston')
require('dotenv').config({path:'./.env'})


// MINIMIST (SE PUEDE ESCOGER PUERTO O CORRER CON SCRIPT TEST EN PUERTO 3000)

const parseArgs = require('minimist');

const options={
    alias:{
        p:'port',
        m:'mode', // fork o cluster
        l:'prod' // logger production
    } 
}

const arg=parseArgs(process.argv.slice(2),options)
const PORT=arg.p||8080;
const server = app.listen(PORT,()=>{
    logger.info(`Servidor express escuchando en el puerto ${PORT}`)
})

server.on('error',(e)=>loggerWinston.error(`Server error: ${e}`))

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

// SESSION 

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

// CONECTION TO MONGO 

const db=keys.MongoURI;
mongoose.connect(db)
.then(()=>logger.info("connected to MongoDB"))
.catch((e)=>loggerWinston.error(`could not connect to database: ${e}`))


app.use('/',router)
app.use('/user', userRouter)
app.use('/api',apiRouter)

app.get('*', (req, res) => {
    const { url, method } = req
    logger.warn(`The Route ${method} ${url} has not been created`)
    res.send(`The following route ${method} ${url} does not exist`)
  })



