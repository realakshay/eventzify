const mongoose = require("mongoose");

const EventManagerSchema = mongoose.Schema({
  companyName: { type: String, required: true },
  ownerFirstName: { type: String, required: true },
  ownerLastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },

  whatsappBusinessNumber: { type: Number, required: false },
  fbPageUrl: { type: String, required: false },
  instagramPageUrl: { type: String, required: false },
  linkedinPageUrl: { type: String, required: false },
  twitterPageUrl: { type: String, required: false },
  youtubePageUrl: { type: String, required: false },
  
  gstNumber: { type: Number, required: false },
  refNumber: { type: Number, required: false },
  businessStartDate: { type: Date, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  pinCode: { type: Number, required: false },
  
});

module.exports = mongoose.model("EventManager", EventManagerSchema);
