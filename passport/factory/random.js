const randomNum=(cant)=>{
    let nums={}
    if (typeof cant==='number'){
        const getRandomNum=()=>Math.floor(Math.random()*10)+1
        for (i=0;i<cant;i++){
            let randomNumber=getRandomNum();
            if (nums[randomNumber]){
                nums[randomNumber]++
            } else {
                nums[randomNumber]=1
            }
        }
    return nums
    }
}

process.on('message',(message)=>{
    if (isNaN((Number(message)))){
        let result=randomNum(500000)
        process.send(result);
    } else {
        let result=randomNum(Number(message))
        process.send(result);
    }
})

module.exports=randomNum;