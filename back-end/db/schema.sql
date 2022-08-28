DROP DATABASE IF EXISTS pbtracker;
CREATE DATABASE pbtracker;

\c pbtracker;

DROP TABLE IF EXISTS machines;

CREATE TABLE IF NOT EXISTS machines (
machineid SERIAL PRIMARY KEY,
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
    playerid SERIAL PRIMARY KEY,
    initials VARCHAR(3),
    name VARCHAR(255),
    nickname VARCHAR(255)
);

DROP TABLE IF EXISTS scores;

CREATE TABLE IF NOT EXISTS scores (
    scoreid SERIAL PRIMARY KEY,
    score INT,
    player INT references players(playerid),
    machine INT references machines(machineid)
);
