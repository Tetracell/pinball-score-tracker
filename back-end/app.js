// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

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
