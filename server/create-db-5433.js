import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // 5433
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
};

const pool = new Pool(config);

async function create() {
  try {
    console.log(
      `Connecting to ${config.host}:${config.port}/${config.database}...`,
    );
    const client = await pool.connect();

    // Check if exists
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'Sport-Back'",
    );
    if (res.rowCount === 0) {
      console.log("Creating database 'Sport-Back'...");
      await client.query('CREATE DATABASE "Sport-Back"');
      console.log("Database 'Sport-Back' created successfully.");
    } else {
      console.log("Database 'Sport-Back' already exists.");
    }

    client.release();
  } catch (err) {
    console.error("Create DB Error:", err.message);
  } finally {
    await pool.end();
  }
}

create();
