const {faker}=require('@faker-js/faker')



function fakeProducts(){
    let productArr=[];
    for (i=0;i<5;i++){
        const newProduct={
            id:i+1,
            title:faker.company.name(),
            price:faker.finance.amount(),
            thumbnail:faker.image.business(),
        }
        productArr.push(newProduct)
    }
    return productArr;
}

module.exports=fakeProducts