const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Configure to get environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import Routes
const eventManagerAuthRoutes = require("./api/routes/EventManagerAuth");
const ceremonyRoutes = require("./api/routes/CeremonyRoute");
const examplePostRoute = require("./api/routes/ExamplePost");
const eventDetailRoute = require("./api/routes/EventDetailRoute");
const customerRoute = require("./api/routes/CustomerRoute");
const productRoute = require("./api/routes/ProductRoute");
const itemRoute = require("./api/routes/ItemRoute");
const eventManagerRoute = require("./api/routes/EventManager");
const orderRoute = require("./api/routes/OrderRoute");
const tempOrderRoute = require("./api/routes/TempOrderRoute");

// Application created
const app = express();

// This package will jsonify the request body
app.use(bodyParser.json());
app.use(cors())

// Initial route created, route will hold callback function with few params i.e. request & response
app.get("/", (req, res) => {
  res.send("Hello, Its Working Fine").status(200);
});

// Created parent path for specific routes
app.use("/auth/manager", eventManagerAuthRoutes);
app.use("/ceremonies", ceremonyRoutes);
app.use("/example", examplePostRoute);
app.use("/event", eventDetailRoute);
app.use("/customer", customerRoute);
app.use("/product", productRoute);
app.use("/item", itemRoute);
app.use("/manager", eventManagerRoute);
app.use("/order", orderRoute);
app.use("/preview", tempOrderRoute);

// process.env.DATABASE_URL => will get mongodb url from .env file
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is connected"))
  .catch(() =>
    console.log("Something getting wrong while connecting database")
  );

const port = process.env.PORT || 3000;

// Application will run on given port and print the status
app.listen(port, () => {
  console.log("Server is running fine...");
});
