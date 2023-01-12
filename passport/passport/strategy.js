const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const User=require('../models/users')
const logger=require('../config/logger')
const winston=require('../config/winston')

// compare hashing

const validatePassword = (user, password) => {
	return bcrypt.compareSync(password, user.password);
};

module.exports=(passport)=>{
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            User.findOne({email:email})
            .then(user=>{
                // check if user exists
                if(!user){
                    logger.info("Passport Strategy: email doesnt match any user")
                    return done(null,false, {message:"email not registered"})
                
                // check if password is correct 
                } else if (!validatePassword(user,password)){
                    logger.info("Passport Strategy: passwords don't match")
                    return done(null,false, {message:"passwords don't match"})
                } else {
                    return done(null,user)
                }
            })
            .catch(e=>{
                winston.error(`error in passport Strategy: ${e}`)
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