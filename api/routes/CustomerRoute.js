const express = require('express');
const router = express.Router();
const Customer = require("../models/CustomerModel");
const {CustomerRegistrationValidation} = require("../Validation");
const verify = require('../VerifyToken');

router.post('/add', async (req, res)=>{
    const {error} = CustomerRegistrationValidation(req.body);;
    if(error) return res.status(400).send(error.details[0].message);
    const customer = new Customer({
        customerName: req.body.customerName
    })
    try{
        const savedCustomer = await customer.save();
        res.status(201).send({customer: savedCustomer._id})
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/all', verify, async (req, res)=>{
    try{
        const customers = await Customer.find({});
        res.status(200).json(customers)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router;