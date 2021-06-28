const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const EventManager = require("../models/EventManagerModel");
const verify = require("../VerifyToken");

router.put("/changePwd", verify, async(req, res) =>{
    try{
        const eventManager = await EventManager.findById(req.user._id);
        const validPass = await bcrypt.compare(req.body.oldPassword, eventManager.password);
        if(validPass){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
            eventManager.password = hashPassword;
            await eventManager.save()
            res.status(200).send({message: "password changed"})
        }else{
            return res.status(400).send({message: "incorrect old password"})
        }
    }catch(err){
        res.status(400).send({message: err})
    }
    
})

module.exports = router;