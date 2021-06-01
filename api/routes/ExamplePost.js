const express = require("express");
const router = express.Router();
const verify = require("../VerifyToken");

router.get("/", verify, (req, res)=>{
    console.log(req.user._id);
    res.send("Private route gonna here")
})

module.exports = router