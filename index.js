const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const  bodyParser = require("body-parser");
dotenv.config();

const app = express();

app.get("/", (req, res)=>{
  res.send("Hello, Its Working Fine").status(201);
})

app.get("/names/:id", (req, res)=>{
  res.status(200).send({"name":"akshay", "id":req.params.id})
})

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("Database is connected"))
.catch(()=>console.log("Something getting wrong"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running fine...");
});