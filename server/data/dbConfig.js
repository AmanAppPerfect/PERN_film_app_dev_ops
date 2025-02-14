import pg from "pg";

const pool = new pg.Pool({
	user: "postgres",
	host: "postgres-service.postgres-ns.svc.cluster.local",
	database: "filmdb",
	password: "postgres",
	port: 5432,
});

export default pool;
