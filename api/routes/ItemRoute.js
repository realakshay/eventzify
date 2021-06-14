const express = require("express");
const router = express.Router();
const verify = require("../VerifyToken");
const Item = require("../models/ItemModel");
const { ItemInsertValidation } = require("../Validation");

router.post("/insert", verify, async (req, res) => {
  const { error } = ItemInsertValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const item = await Item({
      companyId: req.user._id,
      customerName: req.body.customerName,
      items: req.body.items,
    });
    const savedItem = await item.save();
    res.status(201).send({ Message: "Item Added", ProductId: savedItem._id });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.get("/all", verify, async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
