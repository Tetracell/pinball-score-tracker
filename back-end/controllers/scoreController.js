const express = require("express");
const score = express.Router();

//Queries
const { newScore } = require("../queries/scores");

//Routes

score.post("/new", async (req, res) => {
  console.log("Adding score");
  try {
    const addScore = await newScore(req.body);
    res.status(200).json({ payload: addScore, success: true });
  } catch (error) {
    res.status(400).json({ error: error, succes: false });
  }
});

module.exports = score;
