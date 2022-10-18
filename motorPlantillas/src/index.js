import express, { urlencoded } from "express";
import { productRouter } from "../router/ProductRouter.js";
import { viewsRouter } from "../router/viewsRouter.js";
import handlebars from "express-handlebars"

const PORT=8080;
const app = express()
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use("/api/products",productRouter)
app.use("/",viewsRouter)
app.engine("hbs", handlebars.engine({
        extname:".hbs",
        defaultLayout:"main.hbs"
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');

const server=app.listen(PORT, ()=>{
    console.log("server running on port " + PORT)
})