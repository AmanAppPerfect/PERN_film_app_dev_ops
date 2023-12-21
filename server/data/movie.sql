CREATE DATABASE filmDB;

use filmDB;

CREATE TABLE directors (
    director_ID SERIAL PRIMARY KEY,
    director_name VARCHAR(255)
);

CREATE TABLE film (
    film_ID SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    film_description VARCHAR(255),
    director_ID INT FOREIGN KEY REFERENCES directors(director_ID)
);