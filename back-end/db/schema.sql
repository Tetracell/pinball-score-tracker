DROP DATABASE IF EXISTS pbTracker;
CREATE DATABASE pbTracker;

\c pbTracker;

DROP TABLE IF EXISTS machines;

CREATE TABLE IF NOT EXISTS machines (
id SERIAL PRIMARY KEY,
name TEXT,
manufacturer TEXT,
prod_year INT,
type TEXT,
designer TEXT,
players INT,
balls INT
);

DROP TABLE IF EXISTS players;

CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    initials VARCHAR(3),
    name VARCHAR(255),
);

DROP TABLE IF EXISTS scores;

CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    score INT,
    tableID FOREIGN KEY,
    playerID FOREIGN KEY,
);
