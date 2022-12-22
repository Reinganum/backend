function randomNum(cant){
    let result=[]
    console.log(typeof message)
    if (typeof cant==='number'){
        for(i=0;i<cant;i++){
            result.push(Math.round(Math.random()*1000))
        }
    return result
    }
}

process.on('message',(message)=>{
    if (isNaN((Number(message)))){
        let result=randomNum(10000)
        process.send(result);
    } else {
        let result=randomNum(Number(message))
        process.send(result);
    }
})