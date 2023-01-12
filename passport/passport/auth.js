const logger=require('../config/logger')

const checkAuthenticated=(req,res,next)=>{
    if (req.isAuthenticated()){
        logger.info("login has been authenticated")
        return next();
    } else{
        logger.info("Attempt to view page without loggin")
        res.send("login to view the page")
    }
}

module.exports=checkAuthenticated;