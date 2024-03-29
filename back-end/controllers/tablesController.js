const express = require("express");
const tables = express.Router();

//Queries
const {
  getAllTables,
  getTable,
  createTable,
  editTable,
  deleteTable,
} = require("../queries/tables");

const { tableScores, topFour } = require("../queries/scores");
//Validations

//Index - all tables
tables.get("/", async (req, res) => {
  console.log("Listing all tables");
  const allTables = await getAllTables();
  if (allTables[0]) {
    res.status(200).json({ payload: allTables, success: true });
  } else {
    res.status(500).json({
      success: false,
      error: "Server error - no machines found",
    });
  }
});
//---Routes---

//Single table
tables.get("/:machineid", async (req, res) => {
  console.log("Retreiving table");
  const { machineid } = req.params;
  const singleTable = await getTable(machineid);
  const machineScores = await tableScores(machineid);
  const topScores = await topFour(machineid);

  if (singleTable.machineid) {
    res.json({
      payload: singleTable,
      scores: machineScores,
      topscores: topScores,
      success: true,
    });
  } else {
    res.status(404).json({
      success: false,
      error: "Table not found",
    });
  }
});

//Create table -- low priority
tables.post("/", async (req, res) => {
  console.log("Creating table");
  try {
    const newTable = await createTable(req.body);
    res.status(200).json({ payload: newTable, success: true });
  } catch (error) {
    return error;
  }
});

//Edit table -- low priority (no query yet)
tables.put("/:id", async (req, res) => {
  console.log("Editing table");
  const { id } = req.params;
  try {
    const table = await editTable(req.body, id);
    res.status(200).send(table);
  } catch (error) {
    return error;
  }
});

//Delete table -- low priority (no query yet)
tables.delete("/:id", async (req, res) => {
  console.log("Removing table");
  const { id } = req.params;
  try {
    const table = await deleteTable(id);
    if (table.name !== "QueryResultError") {
      res.status(200).json({ payload: table, success: true });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

module.exports = tables;
