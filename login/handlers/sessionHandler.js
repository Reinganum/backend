const main=(req,res)=>{
    console.log(req.session.id)
    if(!req.session.name){
        res.redirect('/login')
    } else{
        const name=req.session.name
        res.render('greeting',{name})
    }
} 

const logUsername=(req,res)=>{
    let {UserName}=req.body
    req.session.name=UserName
    console.log(req.session.id)
    res.redirect('/')
}

const forget=(req,res)=>{
    try{
        const name=req.session.name
        req.session.destroy();
        res.render('farewell',{name})
    }
    catch(error){
        res.status(500).send(`could not logout, error: ${error}`)
    }
}

const register=(req,res)=>{
    res.render('register')
}

/*
if(req.session.counter){
        req.session.counter++;
        res.status(200).send(`${req.session.name} visited the page ${req.session.counter} times`)
        res.render('greeting')
    } else{
        const name=req.query.name||'anonimo'
        req.session.counter=1;
        req.session.name=name;
        res.status(200).send(`Welcome ${name}!`)
    }
*/

module.exports={main,forget,logUsername,register}