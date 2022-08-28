DROP DATABASE IF EXISTS pbtracker;
CREATE DATABASE pbtracker;

\c pbtracker;

CREATE TABLE IF NOT EXISTS machines (
machineid SERIAL PRIMARY KEY,
name TEXT NOT NULL,
manufacturer TEXT NOT NULL,
prod_year INT,
type TEXT NOT NULL,
designer TEXT,
players INT,
balls INT
);

CREATE TABLE IF NOT EXISTS players (
    playerid SERIAL PRIMARY KEY,
    initials VARCHAR(3) NOT NULL,
    name VARCHAR(255),
    nickname VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS scores (
    scoreid SERIAL PRIMARY KEY,
    score INT NOT NULL,
    date TEXT,
    player INT references players(playerid),
    machine INT references machines(machineid)
);
