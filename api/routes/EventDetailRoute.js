const express = require("express");
const router = express.Router();
const verify = require("../VerifyToken");
const EventDetail = require("../models/EventDetailModel");
const { EventDetailValidation } = require("../Validation");

// Create new event
router.post("/add", verify, async (req, res) => {
  const { error } = EventDetailValidation(req.body);
  if (error) return res.status(400).send({message:rror.details[0].message});

  let date = new Date(req.body.eventDate);
  let mm = date.getMonth() < 10 ? "0"+`${date.getMonth()+1}` : date.getMonth()+1
  let dd = date.getDate() < 10 ? "0"+`${date.getDate()}` : date.getDate()
  let finalDate = date.getFullYear()+"/"+mm+"/"+dd;

  const eventDetail = new EventDetail({
    companyId: req.user._id,
    customerName: req.body.customerName,
    numberOfAttendees: req.body.numberOfAttendees,
    selectedEvent: req.body.selectedEvent,
    eventDate: finalDate,
    eventTime: req.body.eventTime,
    eventVenue: req.body.eventVenue,
  });

  console.log(eventDetail);

  try {
    const savedEvent = await eventDetail.save();
    res.status(201).send({ Message: "Event Created", EventId: savedEvent._id });
  } catch (err) {
    res.status(400).send({message:err});
  }
});

//Getting all events
router.get("/all", verify, async (req, res) => {
  try {
    const allEvents = await EventDetail.find({});
    res.status(201).json(allEvents);
  } catch (err) {
    res.status(400).send({message:err});
  }
});
module.exports = router;
