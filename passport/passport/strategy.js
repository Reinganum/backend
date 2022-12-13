const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const User=require('../models/users')
const passport=require('passport')

// compare hashing

const validatePassword = (user, password) => {
	return bcrypt.compareSync(password, user.password);
};

const login=(req, username, password, done)=>{

}

module.exports=(passport)=>{
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            User.findOne({email:email})
            .then(user=>{
                // check if user exists
                if(!user){
                    console.log("email doesnt match any user")
                    return done(null,false, {message:"email not registered"})
                
                // check if password is correct 
                } else if (!validatePassword(user,password)){
                    console.log("passwords don't match")
                    return done(null,false, {message:"passwords don't match"})
                } else {
                    return done(null,user)
                }
            })
            .catch(e=>{
                console.log(`error: ${e}`)
            })
            
        })  
    )
    // SERIALIZE
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });

    // DESERIALIZE
    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user)=> {
        done(err, user);
        });
    });
}