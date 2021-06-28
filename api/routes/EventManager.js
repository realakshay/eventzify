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

router.put("/update", verify, async(req, res) =>{
    try{
        const eventManager = await EventManager.findById(req.user._id);
        if(req.body.companyName) eventManager.companyName = req.body.companyName;
        if(req.body.ownerFirstName) eventManager.ownerFirstName = req.body.ownerFirstName;
        if(req.body.ownerLastName) eventManager.ownerLastName = req.body.ownerLastName;
        if(req.body.email) eventManager.email = req.body.email;
        if(req.body.phoneNumber) eventManager.phoneNumber = req.body.phoneNumber;
        if(req.body.whatsappBusinessNumber) eventManager.whatsappBusinessNumber = req.body.whatsappBusinessNumber;
        if(req.body.fbPageUrl) eventManager.fbPageUrl = req.body.fbPageUrl;
        if(req.body.instagramPageUrl) eventManager.instagramPageUrl = req.body.compainstagramPageUrlnyName;
        if(req.body.linkedinPageUrl) eventManager.linkedinPageUrl = req.body.linkedinPageUrl;
        if(req.body.twitterPageUrl) eventManager.twitterPageUrl = req.body.twitterPageUrl;
        if(req.body.youtubePageUrl) eventManager.youtubePageUrl = req.body.youtubePageUrl;
        if(req.body.city) eventManager.city = req.body.city;
        if(req.body.state) eventManager.state = req.body.state;
        if(req.body.country) eventManager.country = req.body.country;
        if(req.body.pinCode) eventManager.pinCode = req.body.pinCode;
        if(req.body.address) eventManager.address = req.body.address;

        await eventManager.save()
        res.status(200).send({message: "updated"})
    }catch(err){
        res.status(400).send({message: err})
    }
})

module.exports = router;