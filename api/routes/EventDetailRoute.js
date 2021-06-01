const express = require("express");
const router = express.Router();
const verify = require("../VerifyToken");
const EventDetail = require("../models/EventDetailModel");
const { EventDetailValidation } = require("../Validation");

router.post("/add", verify, async (req, res) => {
  const { error } = EventDetailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const eventDetail = new EventDetail({
    companyId: req.user._id,
    customerName: req.body.customerName,
    numberOfAttendees: req.body.numberOfAttendees,
    selectedEvent: req.body.selectedEvent,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
    eventVenue: req.body.eventVenue,
  });

  try {
    const savedEvent = await eventDetail.save();
    res.status(201).send({ Message: "Event Created", EventId: savedEvent._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
