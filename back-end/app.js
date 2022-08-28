// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON
const playerController = require("./controllers/playerController");
const tableController = require("./controllers/tablesController");

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/player", playerController);
app.use("/tables", tableController);

//404
app.get("*", (req, res) => {
  res.status(404).send("Error : Page not found");
})

// EXPORT
module.exports = app;
