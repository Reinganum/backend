const checkAuthenticated=(req,res,next)=>{
    if (req.isAuthenticated()){
        return next();
    } else{
        res.send("login to view the page")
    }
}

module.exports=checkAuthenticated;