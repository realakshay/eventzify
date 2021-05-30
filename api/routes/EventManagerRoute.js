const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const EventManager = require("../models//EventManagerModel");
const { ManagerRegistrationValidation } = require("../Validation");

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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedPost = await eventManager.save();
    res.status(200).send({ user: savedPost._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
