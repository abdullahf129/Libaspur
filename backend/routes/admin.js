const router = require("express").Router();

    router.get("/admin",(req,res)=>{
    
    
        res.send("Hello admin");
    });
  
module.exports=router