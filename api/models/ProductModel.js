const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  companyId: { type: String, required: false },
  productName: { type: String, required: true },
  productCode: { type: String, required: true },
  productImgUrl: { type: String, required: false },
  measuredIn: { type: String, required: true }, //grams,kg, ltr
  quantity: { type: Number, required: true }, //grams,kg, ltr
  productCategory: { type: Array, required: false, default: [] },
  priceRange: { type: Object, required: false, default: {} },
  //PriceRange will be : [{range1: 100, range2: 200, range2: 300, range4: 400, range5: 500}]
});

module.exports = mongoose.model("Product", ProductSchema);
