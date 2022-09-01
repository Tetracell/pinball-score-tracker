const express = require("express");
const player = express.Router();

//Queries
const {
  getAllPlayers,
  getPlayer,
  addPlayer,
  editPlayer, // Low Priority - admin only
  deletePlayer, // Super low priority - admin only
} = require("../queries/players");

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
  const { id } = req.params;
  const singlePlayer = await getPlayer(id);
  if (singlePlayer.name !== "QueryResultError") {
    res.json({ payload: singlePlayer, success: true });
  } else {
    res.status(404).json({
      success: false,
      error: "Player not found",
    });
  }
});

//Create player
player.post("/new", async (req, res) => {
  console.log("Creating player");
  try {
    const newPlayer = await addPlayer(req.body);
    res.status(200).json({ payload: newPlayer, success: true });
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

//Edit player -- requires auth
player.put("/:id", async (req, res) => {
  console.log("Editing player");
  const { id } = req.params;
  try {
    const player = await editPlayer(req.body, id);
    res.status(200).send(player);
  } catch (error) {
    return error;
  }
});

//Delete player -- requires auth
player.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const player = await deletePlayer(id);
    if (player.name !== "error") {
      res.status(200).json({ payload: player, success: true });
    } else {
      throw error = "Something went wrong";
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

module.exports = player;
