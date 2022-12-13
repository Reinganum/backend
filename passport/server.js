const express=require('express');
const router=require('./routes/index')
const userRouter=require('./routes/users')
const app=express();
const PORT=process.env.PORT||8080;
const {engine} = require('express-handlebars')
const mongoose=require('mongoose') 
const keys=require('./config/keys')
const session=require('express-session')
const Mongostore=require('connect-mongo')
const advancedOptions={useNewUrlParser:true,useUnifiedTopology:true}
const passport=require('passport')
const strategy=require('./passport/strategy')

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

app.use(session({
    store:Mongostore.create({
        mongoUrl:'mongodb+srv://harijanF:NGC654e.@cluster0.mdmbmnr.mongodb.net/?retryWrites=true',
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
app.listen(PORT, ()=>console.log(`server running on: ${PORT}`))