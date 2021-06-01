const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema({
    customerName: { type: String, required: true}
})

module.exports = mongoose.model("Customer", CustomerSchema);
