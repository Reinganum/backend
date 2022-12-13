const express=require('express')
const router=express.Router()
const User=require('../models/users')
const bcrypt=require('bcrypt')
const passport=require('passport')

// hashing (mover a handlers)

const createHash = (pass)=> {
	return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
};


// LOGIN

router.get('/login', (req,res)=>{
    res.render('login')
})

// LOGOUT 

router.get('/logout',(req,res)=>{
    try{
        const name=req.session.name
        req.session.destroy();
        res.render('farewell',{name:req.user.username})
    }
    catch(error){
        res.status(500).send(`could not logout, error: ${error}`)
    }
}
)


// HANDLE LOGIN

router.post('/login', (req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/greeting',
        failureRedirect:'/user/login'
    })(req,res,next);
})

// REGISTER 

router.get('/register', (req,res)=>{
    res.render('register')
})


// HANDLE REGISTRATION

router.post('/register', (req,res)=>{
    const {username,email,password}=req.body
    if(!username||!email||!password){
        console.log("there is a problem here")
        res.render('register')
    } else {
        User.findOne({username:username})
        .then(user=>{
            if(user){
                console.log("user already exists")
                res.render('register')
            } else {
                const newUser=new User({
                    username,
                    email,
                    password,
                })
                newUser.password=createHash(password)
                newUser.save()
                res.redirect('/user/login')
            }
        })
    }
})

module.exports=router;