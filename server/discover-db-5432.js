import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: 5432, // FORCE 5432
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
};

const pool = new Pool(config);

async function discover() {
  try {
    const client = await pool.connect();
    const res = await client.query(
      "SELECT datname FROM pg_database WHERE datistemplate = false",
    );
    console.log(
      "Databases on 5432:",
      res.rows.map((r) => r.datname),
    );
    client.release();
  } catch (err) {
    console.error("Discovery Error 5432:", err.message);
  } finally {
    await pool.end();
  }
}

discover();
