const addproduct  = require("../controllers/addproduct.js");

const router = require("express").Router()

router.get("/add", addproduct)

module.exports =router
