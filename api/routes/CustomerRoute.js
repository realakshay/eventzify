const express = require("express");
const router = express.Router();
const Customer = require("../models/CustomerModel");
const { CustomerRegistrationValidation } = require("../Validation");
const verify = require("../VerifyToken");

router.post("/add", async (req, res) => {
  const { error } = CustomerRegistrationValidation(req.body);
  if (error) return res.status(400).send({message:error.details[0].message});
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city || "",
    state: req.body.state || "",
    country: req.body.country || ""
  });
  try {
    const savedCustomer = await customer.save();
    res.status(201).send({ message: "customer added", customer: savedCustomer._id });
  } catch (err) {
    res.status(400).send({message:err});
  }
});

router.get("/all", verify, async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (err) {
    res.status(400).send({message:err});
  }
});

router.put("/update",verify, async (req, res) =>{
  if (!req.body.customerId)
    return res.send(404).send({ message: "couldn't found customer id" });
  try{
    const customer = await Customer.findById(req.body.customerId);
    if(req.body.firstName) customer.firstName = req.body.firstName;
    if(req.body.lastName) customer.firstName = req.body.lastName;
    if(req.body.email) customer.email = req.body.email;
    if(req.body.phoneNumber) customer.phoneNumber = req.body.phoneNumber;
    if(req.body.addressLine1) customer.addressLine1 = req.body.addressLine1;
    if(req.body.addressLine2) customer.addressLine2 = req.body.addressLine2;
    if(req.body.city) customer.city = req.body.city;
    if(req.body.state) customer.state = req.body.state;
    if(req.body.country) customer.country = req.body.country;

    await customer.save();
    res.status(200).json({ message: "updated.." });
  }catch(err){
    res.status(400).send({ message: err });
  }
})

router.delete("/remove", verify, async(req, res) =>{
  if (!req.body.customerId)
    return res.send(400).send({message: "to perform this request you need to send customerId in body"});
  try{
    const customer = await Customer.findById(req.body.customerId);
    if(customer){
      const result = await Customer.findByIdAndDelete(req.body.customerId);
      res.status(200).send({ message: "customer removed" });
    }else{
      res.status(404).send({ message: "customer with this id not found" });
    }
  }catch(err){
    res.status(400).send({ message: err });
  }
})
module.exports = router;
