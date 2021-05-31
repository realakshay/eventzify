const express = require("express");
const router = express.Router();
const verify = require("../VerifyToken");

router.get("/", verify, (req, res)=>{
    res.send("Private route gonna here")
})

module.exports = router