const express= require("express");
const dotenv = require('dotenv');
const {handler}=require("./src/controller/index")
dotenv.config();

const PORT=process.env.PORT

const app = express();
app.use(express.json());

app.post("*",async(req,res)=>{
    console.log(req.body);
    res.send(await handler(req,"POST"));
})

app.get("*",async(req,res)=>{
    res.send(await handler(req,"GET"));
})


app.listen(PORT,function(err){
    if(err) console.log(err);
    console.log("Server listening on PORT",PORT);
})