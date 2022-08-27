DROP DATABASE IF EXISTS cta_dev;
CREATE DATABASE cta_dev;

\c cta_dev;

DROP TABLE IF EXISTS test;

CREATE TABLE tables (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255),
    manufacturer VARCHAR(255),
    prod_year VARCHAR(255),
    designer VARCHAR(255),
    players INT,
    balls INT,
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    initials VARCHAR(3),
    name VARCHAR(255),
)


CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    score INT,
    tableID FOREIGN KEY,
    playerID FOREIGN KEY,
)
