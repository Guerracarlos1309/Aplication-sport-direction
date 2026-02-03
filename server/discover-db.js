import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres", // Connect to default DB first
};

const pool = new Pool(config);

async function discover() {
  try {
    const client = await pool.connect();
    const res = await client.query(
      "SELECT datname FROM pg_database WHERE datistemplate = false",
    );
    console.log(
      "Databases on 5433:",
      res.rows.map((r) => r.datname),
    );

    // Try connecting to them
    for (const db of res.rows) {
      if (db.datname === "postgres") continue;
      console.log(`Attempting connection to '${db.datname}'...`);
      const subPool = new Pool({ ...config, database: db.datname });
      try {
        const subClient = await subPool.connect();
        console.log(`SUCCESS: Connected to '${db.datname}'`);
        subClient.release();
      } catch (e) {
        console.log(
          `FAILED: Could not connect to '${db.datname}': ${e.message}`,
        );
      }
      await subPool.end();
    }

    client.release();
  } catch (err) {
    console.error("Discovery Error:", err.message);
  } finally {
    await pool.end();
  }
}

discover();
