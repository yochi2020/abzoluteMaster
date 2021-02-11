const app = require('express')()
const bodypaser =require('body-parser')
const routes = require("./routes/Admin")
app.use(bodypaser.json())
app.use(bodypaser.urlencoded({extended:true}))
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*") 
    res.setHeader(
        "Acess-Control-Allow-Header",
        "Origin,X-Requested-With,Control-Type,Accept,Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE"
    )
    res.header("Access-Control-Allow-Headers","*")
    next();
})
app.use(routes)



app.listen(4000,()=>{
    console.log("server on port 4000")
})