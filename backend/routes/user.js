const router = require("express").Router();

    router.get("/usertest",(req,res)=>{
    
    
        res.send("Hello World");
    });
  
module.exports=router