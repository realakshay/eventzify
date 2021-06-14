const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({

    companyId: { type: String, required: false },
    customerName: { type: String, required: false, default: "Default Customer" },
    items : {type: Array, required: false, default: []} 
    //items will be [{name:"item", category:"cat", price: price}]

})
module.exports = mongoose.model("Item", ItemSchema)