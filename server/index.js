import express from "express";
import cors from "cors";

import pool from "./data/db.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/directors", async (req, res) => {
	const directors = await pool.query(`SELECT * FROM directors;`);
	res.send(directors.rows);
});

app.get("/directors/:director_name", async (req, res) => {
	const director_name = req.params.director_name;
	const directors = await pool.query(
		`SELECT * FROM directors WHERE director_name='${director_name}';`
	);
	res.send(directors.rows);
});

app.post("/addDirector", async (req, res) => {
	try {
		const { director_name } = req.body;

		const newDirector = await pool.query(
			`INSERT INTO directors(director_name) VALUES('${director_name}') RETURNING *`
		);
		console.log(newDirector);
		res.send("Added Succesfully");
	} catch (er1) {
		console.log(er1);
	}
});

// Adding a new film
app.post("/addFilm", async (req, res) => {
	const { title, film_description = "", director_id = 0 } = req.body;
	try {
		const response = await pool.query(
			`INSERT INTO film(title, film_description, director_id) VALUES('${title}','${film_description}','${director_id}') RETURNING *`
		);
		res.send(response);
	} catch (er2) {
		console.error(er2);
	}
});

// Fetching All films when page is loaded, a film is updated, a film is deleted
app.get("/films", async (req, res) => {
	const films = await pool.query(`SELECT * FROM film;`);
	console.log(films.rows);
	res.send(films.rows);
});

// To edit a film
app.put("/film/edit", async (req, res) => {
	const { film_id, title, film_description, director_id } = req.body;
	try {
		const response = await pool.query(
			`UPDATE film
			SET title='${title}',film_description='${film_description}',director_id='${director_id}'
			WHERE film_id='${film_id}' RETURNING *`
		);
		res.send(response);
	} catch (er3) {
		console.log(er3);
	}
});

app.delete("/film/:film_id", async (req, res) => {
	const film_id = req.params.film_id;
	console.log(film_id);
	try {
		const response = await pool.query(
			`DELETE FROM film WHERE film_id='${film_id}';`
		);
		console.log(response);
	} catch (er4) {
		console.log(er4);
	}
});

app.listen(5000, () => {
	console.log("Server Started");
});
