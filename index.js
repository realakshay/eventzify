const express = require("express");
const mongoose = require("mongoose");
const  bodyParser = require("body-parser");

// Configure to get environment variables
const dotenv = require('dotenv');
dotenv.config();

// Import Routes
const eventManagerAuthRoutes = require('./api/routes/EventManagerAuth')

// Application created
const app = express();

// This package will jsonify the request body
app.use(bodyParser.json());

// Initial route created, route will hold callback function with few params i.e. request & response
app.get("/", (req, res)=>{
  res.send("Hello, Its Working Fine").status(200);
})

// Created parent path for specific routes
app.use('/auth/manager', eventManagerAuthRoutes);

// process.env.DATABASE_URL => will get mongodb url from .env file
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("Database is connected"))
.catch(()=>console.log("Something getting wrong while connecting database"));

const port = process.env.PORT || 3000;

// Application will run on given port and print the status
app.listen(port, () => {
  console.log("Server is running fine...");
});
