import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
console.log(`DB_NAME: '${dbName}' (Length: ${dbName.length})`);
for (let i = 0; i < dbName.length; i++) {
  console.log(`Char ${i}: ${dbName.charCodeAt(i)}`);
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function test() {
  try {
    const client = await pool.connect();
    console.log("Connected successfully with pg!");
    const res = await client.query("SELECT NOW()");
    console.log(res.rows[0]);
    client.release();
  } catch (err) {
    console.error("PG Connection Error:", err.message);
  } finally {
    await pool.end();
  }
}

test();
