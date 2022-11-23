const router = require("express").Router();

    router.get("/adminpanel",(req,res)=>{
    
    
        res.send("Hello admin");
    });
  
module.exports=router