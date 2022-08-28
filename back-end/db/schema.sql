DROP DATABASE IF EXISTS pbtracker;
CREATE DATABASE pbtracker;

\c pbtracker;

CREATE TABLE machines (
    machineid SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    prod_year INT,
    type TEXT NOT NULL,
    designer TEXT,
    players INT,
    balls INT,
    img TEXT,
    grandchamp INT
);

CREATE TABLE players (
    playerid SERIAL PRIMARY KEY,
    initials VARCHAR(3) NOT NULL,
    name VARCHAR(255),
    nickname VARCHAR(255),
    avatar TEXT
);

CREATE TABLE scores (
    scoreid SERIAL PRIMARY KEY,
    score INT NOT NULL,
    date TEXT,
    witness TEXT,
    player INT references players(playerid),
    machine INT references machines(machineid),
);
