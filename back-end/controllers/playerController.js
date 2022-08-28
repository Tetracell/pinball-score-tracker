const express = require("express");
const db = require("../db/dbConfig");
const player = express.Router();

//Queries

//Validations

//Index - all players
player.get("/", async (req, res) => {
  console.log("Listing all players");
  const allPlayers = await getAllPlayers();
  if (allPlayers[0]) {
    res.status(200).json({ payload: allPlayers, success: true });
  } else {
    res.status(500).json({
      success: false,
      error: "Server error - no players found",
    });
  }
});

//---Routes---

//Single player
player.get("/:id", async (req, res) => {
  console.log("Retreiving player");
  const singlePlayer = await getPlayer();
  if (singlePlayer.name !== "QueryResultError") {
    res.json({ payload: singlePlayer, success: true });
  } else {
    res.status(404).json({ success: false, error: "Player not found" });
  }
});

//Create player

//Edit player -- requires auth

//Delete player -- requires auth
