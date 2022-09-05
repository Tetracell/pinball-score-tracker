const db = require("../db/dbConfig");

//All scores for a table
const tableScores = async (id) => {
  try {
    console.log("Retreiving table scores");
    const allScores = await db.any(
      "SELECT * FROM scores WHERE machine=$1 ORDER BY score DESC",
      id
    );
    return allScores;
  } catch (error) {
    return error;
  }
};

//Top 4 for a table - unnecessary?? - I think this could be useful still for the a potential rolling horizontal list that displays the games and the top 4 scores.
// *** This is unnecessary. Remove later, most logic already in front-end ***
const topFour = async (id) => {
  try {
    console.log("Retreiving the top four");
    const scores = await db.any(
      "SELECT * FROM scores WHERE machine=$1 ORDER BY score DESC LIMIT 4",
      id
    );
    return scores;
  } catch (error) {
    return error;
  }
};

//All scores for a player
const playerScores = async (id) => {
  try {
    const allScores = await db.any(
      "SELECT * FROM scores WHERE player=$1 ORDER BY scoreid ASC",
      id
    );
    return allScores;
  } catch (error) {
    return error;
  }
};

//Create new score
const newScore = async (score) => {
  try {
    const newScore = await db.one(
      "INSERT INTO scores (score, player, machine) VALUES ($1, $2, $3) RETURNING *",
      [score.score, score.player, score.machine]
    );
    return newScore;
  } catch (error) {
    return error;
  }
};

//Edit score <- Low Priority ->

//Delete score <- Borderline no priority ->

module.exports = { tableScores, playerScores, newScore, topFour };
