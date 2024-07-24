CREATE TABLE directors (
    director_ID SERIAL PRIMARY KEY,
    director_name VARCHAR(255)
);

CREATE TABLE film (
    film_ID SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    film_description VARCHAR(255),
    director_ID INT,
    FOREIGN KEY (director_ID) REFERENCES directors(director_ID)
);

CREATE TABLE registereduser(
    username VARCHAR(255),
    user_age INT,
    user_f_name VARCHAR(255),
    user_l_name VARCHAR(255),
    user_email VARCHAR(255)
);

CREATE TABLE uservalidation(
    username VARCHAR(255),
    user_password VARCHAR(255)
);