const db = require("../db/dbconfig.js");

// name, manufacturer, prod_year, type, designer, players, balls -- column layout

// All Tables
const getAllTables = async () => {
  try {
    const allMachines = await db.any("SELECT * FROM machines");
    return allMachines;
  } catch (error) {
    return error;
  }
};

// Single Table
const getTable = async (id) => {
  try {
    const singleMachine = await db.one(
      "SELECT * FROM machines WHERE machineid=$1",
      id
    );
    return singleMachine;
  } catch (error) {
    return error;
  }
};


// Create Table
const createTable = async (table) => {
  try {
    buildMachine = await db.one(
      "INSERT INTO machines (name, manufacturer, prod_year, type, designer, players, balls) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        table.name,
        table.manufacturer,
        table.prod_year,
        table.type,
        table.designer,
        table.players,
        table.balls,
      ]
    );
    return buildMachine;
  } catch (error) {
    return error;
  }
};

// Edit Table -- low priority
const editTable = async (id) => {
  try {
  } catch (error) {
    return error;
  }
};

// Delete Table -- low priority
const deleteTable = async (id) => {
  try {
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllTables,
  getTable,
  createTable,
  editTable,
  deleteTable,
};
