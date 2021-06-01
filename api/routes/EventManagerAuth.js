const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const EventManager = require("../models/EventManagerModel");
const { ManagerRegistrationValidation, ManagerLoginValidation } = require("../Validation");

router.post("/register", async (req, res) => {
  // Validate input data
  const { error } = ManagerRegistrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check whether user with email is already exist or not
  const emailExist = await EventManager.findOne({ email: req.body.email });
  if (emailExist) return res.status(409).send("Email already exists");

  // Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const eventManager = new EventManager({
    // firstName: req.body.firstName,
    // lastName: req.body.lastName || "",
    // email: req.body.email,
    // password: hashPassword,
    companyName: req.body.companyName,
    ownerFirstName: req.body.ownerFirstName,
    ownerLastName: req.body.ownerLastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: hashPassword,

    whatsappBusinessNumber: req.body.whatsappBusinessNumber || "",
    fbPageUrl: req.body.fbPageUrl || "",
    instagramPageUrl: req.body.instagramPageUrl || "",
    linkedinPageUrl: req.body.linkedinPageUrl || "",
    twitterPageUrl: req.body.twitterPageUrl || "",
    youtubePageUrl: req.body.youtubePageUrl || "",
    
    gstNumber: req.body.gstNumber || "",
    refNumber: req.body.refNumber || "",
    businessStartDate: req.body.businessStartDate || "",
    address: req.body.address || "",
    city: req.body.city || "",
    state: req.body.state || "",
    country: req.body.country || "",
    pinCode: req.body.pinCode || "",

    ceremonies: req.body.ceremonies || []
  });

  try {
    const savedUser = await eventManager.save();
    res.status(201).send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res)=>{
  // Validate input data
  const {error} = ManagerLoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check whether user is exist or not
  const userExist = await EventManager.findOne({email: req.body.email});
  if(!userExist) return res.status(404).send("Email not found");

  // Check valid password
  const validPass = await bcrypt.compare(req.body.password, userExist.password);
  if(!validPass) return res.status(400).send("Invalid password");

  // Create jwt token
  const token = jwt.sign({_id: userExist._id}, process.env.JWT_SECRET_TOKEN)
  res.header('auth-token', token).send(token);

})
module.exports = router;
