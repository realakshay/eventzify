const mongoose = require("mongoose");

const OrderModel = mongoose.Schema({
  customerName: { type: String, required: true },
  numberOfAttendees: { type: Number, required: true },
  selectedEvent: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
  eventVenue: { type: String, required: true },
  //   ceremoneyName: { type: String, required: true },
  subEvents: { type: Array, required: false, default: [] },
  starterData: { type: Array, required: false, default: [] },
  saladData: { type: Array, required: false, default: [] },
  soupData: { type: Array, required: false, default: [] },
  dessertData: { type: Array, required: false, default: [] },
  mainCourseData: { type: Array, required: false, default: [] },
  soupCount: { type: Number, required: false, default: 0 },
  saladCount: { type: Number, required: false, default: 0 },
  starterCount: { type: Number, required: false, default: 0 },
  mainCourseCount: { type: Number, required: false, default: 0 },
  dessertCount: { type: Number, required: false, default: 0 },
  totalPrice: { type: Number, required: true },
  title: { type: String, required: true },
  messageText: { type: String, required: true },
});
module.exports = mongoose.model("Order", OrderModel);
