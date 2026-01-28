const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const db = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// --- API Routes ---

// 0. Auth
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query(
      "SELECT u.*, p.name as player_name FROM users u LEFT JOIN players p ON u.player_id = p.id WHERE u.username = $1 AND u.password = $2",
      [username, password],
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      delete user.password;
      res.json(user);
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1. Coaching: Sessions
app.get("/api/sessions", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM training_sessions ORDER BY date DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/sessions", async (req, res) => {
  const { title, type, description } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO training_sessions (title, type, description) VALUES ($1, $2, $3) RETURNING *",
      [title, type, description],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/sessions/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM training_sessions WHERE id = $1", [
      req.params.id,
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Players (Call-ups & Health)
app.get("/api/players", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM players ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/players/:id", async (req, res) => {
  const { status, medical_status, prognosis } = req.body;
  try {
    const result = await db.query(
      "UPDATE players SET status = COALESCE($1, status), medical_status = COALESCE($2, medical_status), prognosis = COALESCE($3, prognosis) WHERE id = $4 RETURNING *",
      [status, medical_status, prognosis, req.params.id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Finance: Payments
app.get("/api/payments", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM payments ORDER BY due_date ASC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/payments/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const result = await db.query(
      "UPDATE payments SET status = $1 WHERE id = $2 RETURNING *",
      [status, req.params.id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Finance: Inventory
app.get("/api/inventory", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM inventory ORDER BY name ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/inventory/:id", async (req, res) => {
  const { stock } = req.body;
  try {
    const result = await db.query(
      "UPDATE inventory SET stock = $1 WHERE id = $2 RETURNING *",
      [stock, req.params.id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Scouting
app.get("/api/scouting/objectives", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM scouting_objectives ORDER BY rating DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/scouting/objectives", async (req, res) => {
  const { name, rating, position } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO scouting_objectives (name, rating, position) VALUES ($1, $2, $3) RETURNING *",
      [name, rating, position],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/scouting/objectives/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM scouting_objectives WHERE id = $1", [
      req.params.id,
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Wellness
app.get("/api/wellness/:player_id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM wellness WHERE player_id = $1 ORDER BY date DESC LIMIT 7",
      [req.params.player_id],
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/wellness", async (req, res) => {
  const { player_id, sleep, fatigue, stress, soreness, mood } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO wellness (player_id, sleep, fatigue, stress, soreness, mood) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT (player_id, date) 
       DO UPDATE SET sleep = $2, fatigue = $3, stress = $4, soreness = $5, mood = $6 
       RETURNING *`,
      [player_id, sleep, fatigue, stress, soreness, mood],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/wellness-summary", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.name, w.* 
      FROM players p 
      JOIN wellness w ON p.id = w.player_id 
      WHERE w.date = CURRENT_DATE
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
