import pg from "pg";

const pool = new pg.Pool({
	user: "appperfect",
	host: "localhost",
	port: 5432,
	database: "filmdb",
});

export default pool;
