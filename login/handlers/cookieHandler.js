const getCookies=(req,res)=>{
    const cookies=req.cookies;
    const signedCookies=req.signedCookies;
    res.status(200).json({cookies,signedCookies})
}

const createCookie=(req,res)=>{
    let {key,value,signed,timeout}=req.query;
    const settings={}
    if(!key||!value)
        return res.status(400).send('You did not assign the required values')
    if(tiempo)
        return settings['maxAge']=parseInt(timeout)
    if(signed)
        return settings['signed']=true
    res.cookie(key,value,settings).json({result:success})
}

const deleteCookie=(req,res)=>{
    const {value}=req.query
    res.clearCookie(value).send(`The cookie with the value ${value} has been eliminated`)
}

module.exports={createCookie,getCookies,deleteCookie}