const express = require("express");
const router = express.Router();
const verify = require("../VerifyToken");
const Product = require("../models/ProductModel");
const { ProductInsertValidation } = require("../Validation");

// /product/insert :POST
router.post("/insert", verify, async (req, res) => {
  const { error } = ProductInsertValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const product = new Product({
    companyId: req.user._id,
    productName: req.body.productName,
    productCode: req.body.productCode,
    productImgUrl: req.body.productImgUrl,
    quantity: req.body.quantity,
    measuredIn: req.body.measuredIn,
    productCategory: req.body.productCategory,
    priceRange: req.body.priceRange,
  });

  try {
    const savedProduct = await product.save();
    res
      .status(201)
      .send({ Message: "Product Added", ProductId: savedProduct._id });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// /product/myproducts :GET
router.get("/myproducts", verify, async (req, res) => {
  try {
    const products = await Product.find({ companyId: req.user._id });
    res.status(201).json(products);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// /product/all : GET
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json(products);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.put("/update", verify, async (req, res) => {
  if (!req.body.productId)
    return res.send(400).send({ message: "couldnt found product id" });
  try {
    const product = await Product.findById(req.body.productId);
    if (req.body.quantity) {
      product.quantity = req.body.quantity;
    }
    if (req.body.priceRange) {
      product.priceRange = req.body.priceRange;
    }
    await product.save();
    res.status(200).json({ message: "updated.." });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
