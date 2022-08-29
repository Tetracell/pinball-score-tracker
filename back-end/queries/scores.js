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

//Top 4 for a table
// const topFour = async (id) => {
//   try {
//     console.log("Retreiving the top four");
//     const scores = await db.any(
//       "SELECT * FROM scores WHERE machine=$1 ORDER BY score DESC LIMIT 4",
//       id
//     );
//     return scores;
//   } catch (error) {
//     return error;
//   }
// };

//All scores for a player
const playerScores = async (id) => {
  try {
    const allScores = await db.any(
      "SELECT * FROM scores WHERE player=$1 ORDER BY name ASC",
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

module.exports = { tableScores, playerScores, topFour, newScore };
