const express = require("express");
const router = express.Router();
const EventManager = require("../models/EventManagerModel");
const verify = require("../VerifyToken");

router.get("/", verify, async (req, res) => {
  try {
    const eventManager = await EventManager.findOne(
      { _id: req.user._id },
      { ceremonies: 1 }   // Sending only ceremonies
    );
    res.send(eventManager);
  } catch (err) {
    res.status(400).send({message:err});
  }
});

router.put("/add", verify, async (req, res) => {
  // ceremonies : [{name:"birthday", events:[]},{name:"marriage", events:[]},{name:"anniversary", events:[]}]
  // req.body : {name:"birthday", events:[]}

  try {
    const eventManager = await EventManager.findOne({ _id: req.user._id });
    let checkExist = eventManager.ceremonies.some(function (ceremony) {
      return ceremony.name == req.body.name;
    });
    if (checkExist) return res.send({message:"ceremony already exist"});
    eventManager.ceremonies.push(req.body);
    const result = await eventManager.save();
    res.status(200).send({message:"ceremony added"});
  } catch (err) {
    res.status(400).send({message:err});
  }
});

module.exports = router;
