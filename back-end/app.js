// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://192.168.50.239:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', false);

//   // Pass to next layer of middleware
//   next();
// });

// ROUTES
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Sanctum score database" });
});

const tablesController = require("./controllers/tablesController");
app.use("/tables", tablesController);
const playerController = require("./controllers/playerController");
app.use("/players", playerController);
const scoreController = require("./controllers/scoreController");
app.use("/scores", scoreController);

//404
app.get("*", (req, res) => {
  res.status(404).send("Error : Page not found");
});

// EXPORT
module.exports = app;
