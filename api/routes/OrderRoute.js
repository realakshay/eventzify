const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");
const { OrderValidation } = require("../Validation");
const verify = require("../VerifyToken");

router.post("/insert", verify, async (req, res) => {
  const { error } = OrderValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let date = new Date(req.body.eventDate);
  let mm =
    date.getMonth() < 10 ? "0" + `${date.getMonth() + 1}` : date.getMonth() + 1;
  let dd = date.getDate() < 10 ? "0" + `${date.getDate()}` : date.getDate();
  let finalDate = date.getFullYear() + "/" + mm + "/" + dd;

  const order = new Order({
    customerName: req.body.customerName,
    numberOfAttendees: req.body.numberOfAttendees,
    selectedEvent: req.body.selectedEvent,
    eventDate: finalDate,
    eventTime: req.body.eventTime,
    eventVenue: req.body.eventVenue,
    // ceremoneyName: req.body.ceremoneyName,

    subEvents: req.body.subEvents || [],
    starterData: req.body.starterData || [],
    saladData: req.body.saladData || [],
    soupData: req.body.soupData || [],
    dessertData: req.body.dessertData || [],
    mainCourseData: req.body.mainCourseData || [],

    soupCount: req.body.soupCount || req.body.soupData.length || 0,
    saladCount: req.body.saladCount || req.body.saladData.length || 0,
    starterCount: req.body.starterCount || req.body.starterData.length || 0,
    mainCourseCount:
      req.body.mainCourseCount || req.body.mainCourseData.length || 0,
    dessertCount: req.body.dessertCount || req.body.dessertData.length || 0,

    totalPrice: req.body.totalPrice,

    title: req.body.title || "",
    messageText: req.body.messageText || "",
  });

  try {
    const savedOrder = await order.save();
    res
      .status(200)
      .send({ message: "order inserted", orderId: savedOrder._id });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.get("/all", verify, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
