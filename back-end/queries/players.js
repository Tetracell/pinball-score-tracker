const db = require("../db/dbConfig");

//Index --- all players
const getAllPlayers = async () => {
  try {
    console.log("Listing all players");
    const players = await db.any("SELECT * FROM players ORDER BY name ASC");
    return players;
  } catch (error) {
    return error;
  }
};

//---Routes---

//Single player
const getPlayer = async (id) => {
  try {
    console.log("Retreiving player");
    const player = await db.one("SELECT * FROM players WHERE playerid=$1", id);
    return player;
  } catch (error) {
    return error;
  }
};

//Create player
const addPlayer = async (player) => {
  try {
    console.log("Adding player to database");
    player = await db.one(
      "INSERT INTO players (initials, name, nickname, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [player.initials.toUpperCase(), player.name, player.nickname, player.avatar]
    );
    return player;
  } catch (error) {
    return error;
  }
};

//Delete player --- Only used for testing purposes, should also only be used by admin, requiring auth.
const deletePlayer = async (id) => {
  console.log("Removing player " + id);
  try {
    const player = await db.one(
      "DELETE FROM players WHERE playerid=$1 RETURNING *", id
    );
    return player;
  } catch (error) {
    return error;
  }
  
}

module.exports = { getAllPlayers, getPlayer, addPlayer, deletePlayer };
