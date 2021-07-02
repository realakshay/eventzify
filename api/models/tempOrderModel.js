const mongoose = require("mongoose");

const TempOrderModel = mongoose.Schema({
  previewId: { type: String, required: true },
  customerName: { type: String, required: false },
  numberOfAttendees: { type: Number, required: false },
  selectedEvent: { type: String, required: false },
  eventDate: { type: String, required: false },
  eventTime: { type: String, required: false },
  eventVenue: { type: String, required: false },
  //   ceremoneyName: { type: String, required: false },
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
  totalPrice: { type: Number, required: false },
  title: { type: String, required: false },
  messageText: { type: String, required: false },
});
module.exports = mongoose.model("TempOrder", TempOrderModel);
