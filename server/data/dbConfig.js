import pg from "pg";

const pool = new pg.Pool({
	user: "postgres",
	host: "db",
	database: "filmdb",
	password: "postgres",
	port: 5432,
});

export default pool;
