CREATE DATABASE admindata;

USE DATABASE admindata;

CREATE TABLE registereduser (
    user_id SERIAL PRIMARY KEY,
    userName VARCHAR(255) UNIQUE NOT NULL,
    user_age INT,
    user_f_name TEXT,
    user_l_name TEXT,
    user_email VARCHAR(255)
);

CREATE TABLE uservalidation (
    userName VARCHAR(255) PRIMARY KEY,
    user_password VARCHAR(255) NOT NULL
);