const mongoose = require('mongoose')

const EventDetailSchema = mongoose.Schema({
    companyId: { type: String, required: false },
    customerName: { type: String, required: true },
    numberOfAttendees: {type: Number, required: true},
    selectedEvent: { type: String, required: true },
    eventDate: {type: Date, required: true},
    eventTime: {type: String, required: true},
    eventVenue: {type: String, required: true},
})

module.exports = mongoose.model("EventDetail", EventDetailSchema);