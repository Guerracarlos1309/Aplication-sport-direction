import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

// Models
import User from "./models/User.js";
import Player from "./models/Player.js";
import TrainingSession from "./models/TrainingSession.js";
import Wellness from "./models/Wellness.js";
import Payment from "./models/Payment.js";
import Inventory from "./models/Inventory.js";
import ScoutingObjective from "./models/ScoutingObjective.js";
import Notification from "./models/Notification.js";
import Settings from "./models/Settings.js";
import Match from "./models/Match.js";
import Contract from "./models/Contract.js";
import Opponent from "./models/Opponent.js";
import PerformanceInsight from "./models/PerformanceInsight.js";
import ScoutingReport from "./models/ScoutingReport.js";
import MarketValue from "./models/MarketValue.js";
import RehabilitationExercise from "./models/RehabilitationExercise.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Basic health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- API Routes ---

// 0. Auth
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username, password },
      include: [{ model: Player, attributes: ["name"] }],
    });

    if (user) {
      const userData = user.toJSON();
      // Flatten player_name for frontend compatibility
      if (userData.Player) {
        userData.player_name = userData.Player.name;
        delete userData.Player; // Clean up
      }
      delete userData.password;
      res.json(userData);
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
    const sessions = await TrainingSession.findAll({
      order: [["date", "DESC"]],
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/sessions", async (req, res) => {
  try {
    const session = await TrainingSession.create(req.body);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/sessions/:id", async (req, res) => {
  try {
    await TrainingSession.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Players (Call-ups, Health, Admin & Profile)
app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.findAll({ order: [["id", "ASC"]] });
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/players", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const player = await Player.create(req.body, { transaction: t });

    // Create automatic user for the player
    // Username is lowercased name without spaces
    const generatedUsername = req.body.name.toLowerCase().replace(/\s+/g, "");

    await User.create(
      {
        username: generatedUsername,
        password: "1234", // Temporary password
        role: "Jugador",
        player_id: player.id,
      },
      { transaction: t },
    );

    await t.commit();
    res.json(player);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/users/change-password", async (req, res) => {
  const { userId, newPassword } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Contraseña actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player)
      return res.status(404).json({ error: "Jugador no encontrado" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/players/:id", async (req, res) => {
  try {
    const { status, callup_acknowledged } = req.body;
    let updateData = { ...req.body };

    // If status is being updated, reset the acknowledgement
    if (status !== undefined) {
      updateData.callup_acknowledged = false;
    }

    const [updated] = await Player.update(updateData, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPlayer = await Player.findByPk(req.params.id);
      res.json(updatedPlayer);
    } else {
      res.status(404).json({ error: "Jugador no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Finance: Payments
app.get("/api/payments", async (req, res) => {
  try {
    const payments = await Payment.findAll({ order: [["due_date", "ASC"]] });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/payments/:id", async (req, res) => {
  try {
    await Payment.update(
      { status: req.body.status },
      { where: { id: req.params.id } },
    );
    const updatedPayment = await Payment.findByPk(req.params.id);
    res.json(updatedPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Finance: Inventory
app.get("/api/inventory", async (req, res) => {
  try {
    const items = await Inventory.findAll({ order: [["name", "ASC"]] });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/inventory/:id", async (req, res) => {
  try {
    await Inventory.update(
      { stock: req.body.stock },
      { where: { id: req.params.id } },
    );
    const updatedItem = await Inventory.findByPk(req.params.id);
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Scouting
app.get("/api/scouting/objectives", async (req, res) => {
  try {
    const objectives = await ScoutingObjective.findAll({
      order: [["rating", "DESC"]],
    });
    res.json(objectives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/scouting/objectives", async (req, res) => {
  try {
    const objective = await ScoutingObjective.create(req.body);
    res.json(objective);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/scouting/objectives/:id", async (req, res) => {
  try {
    await ScoutingObjective.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Wellness
app.get("/api/wellness/:player_id", async (req, res) => {
  try {
    const records = await Wellness.findAll({
      where: { player_id: req.params.player_id },
      order: [["date", "DESC"]],
      limit: 7,
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/wellness", async (req, res) => {
  const { player_id, date, ...metrics } = req.body;
  const entryDate = date || new Date().toISOString().split("T")[0];

  try {
    const [record] = await Wellness.upsert(
      {
        player_id,
        date: entryDate,
        ...metrics,
      },
      { returning: true },
    );

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Statistics & Performance
app.get("/api/stats/team-progression", async (req, res) => {
  try {
    // Get last 4 weeks of averge wellness
    const stats = await Wellness.findAll({
      attributes: [
        [sequelize.fn("date_trunc", "week", sequelize.col("date")), "week"],
        [sequelize.fn("AVG", sequelize.col("sleep")), "sleep"],
        [sequelize.fn("AVG", sequelize.col("fatigue")), "fatigue"],
        [sequelize.fn("AVG", sequelize.col("stress")), "stress"],
        [sequelize.fn("AVG", sequelize.col("mood")), "mood"],
      ],
      group: [sequelize.fn("date_trunc", "week", sequelize.col("date"))],
      order: [
        [sequelize.fn("date_trunc", "week", sequelize.col("date")), "ASC"],
      ],
      limit: 5,
    });

    const formatted = stats.map((s, index) => ({
      name: `Sem ${index + 1}`,
      rendimiento: Math.round(
        ((parseFloat(s.dataValues.sleep) + parseFloat(s.dataValues.mood)) /
          10) *
          100,
      ),
      fisico: Math.round(
        ((parseFloat(s.dataValues.fatigue) + parseFloat(s.dataValues.stress)) /
          10) *
          100,
      ),
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/performance-rankings", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const wellnessRecords = await Wellness.findAll({
      where: { date: today },
      include: [{ model: Player, attributes: ["name"] }],
    });

    const rankings = wellnessRecords
      .map((r) => {
        const data = r.toJSON();
        // Calculate a mock score based on metrics (1-10 scale originally, normalize to 100)
        // High sleep, low fatigue, low stress, low soreness, high mood = good
        const score = Math.round(
          (data.sleep / 10) * 30 +
            ((10 - data.fatigue) / 10) * 20 +
            ((10 - data.stress) / 10) * 20 +
            (data.mood / 10) * 30,
        );

        return {
          id: data.player_id,
          name: data.Player ? data.Player.name : "Unknown",
          score: score,
          trend: "up", // Mock trend
        };
      })
      .sort((a, b) => b.score - a.score);

    res.json(rankings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/dashboard-summary", async (req, res) => {
  try {
    const playerCount = await Player.count();
    const sessionCount = await TrainingSession.count();
    const pendingPayments = await Payment.count({
      where: { status: "pending" },
    });
    const scoutingCount = await ScoutingObjective.count();

    res.json({
      players: playerCount,
      sessions: sessionCount,
      payments: pendingPayments,
      scouting: scoutingCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Notifications
app.get("/api/notifications", async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/notifications", async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/notifications/read-all", async (req, res) => {
  try {
    await Notification.update({ read: true }, { where: { read: false } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/notifications/:id/read", async (req, res) => {
  try {
    await Notification.update({ read: true }, { where: { id: req.params.id } });
    const updated = await Notification.findByPk(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Global Settings
app.get("/api/settings", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/settings", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Matches
app.get("/api/matches/latest", async (req, res) => {
  try {
    const match = await Match.findOne({ order: [["date", "DESC"]] });
    res.json(
      match || {
        opponent: "Sin datos",
        score: "0-0",
        possession: "50%",
        shots: 0,
        passing: "0%",
        analysis_points: "No hay registros disponibles.",
      },
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Contracts
app.get("/api/contracts", async (req, res) => {
  try {
    const contracts = await Contract.findAll({ order: [["end_date", "ASC"]] });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 12. Opponents (Scouting Inteligencia)
app.get("/api/opponents", async (req, res) => {
  try {
    const opponents = await Opponent.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(opponents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/opponents", async (req, res) => {
  try {
    const opponent = await Opponent.create(req.body);
    res.json(opponent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/opponents/:id", async (req, res) => {
  try {
    await Opponent.destroy({ where: { id: req.params.id } });
    res.json({ message: "Opponent deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 13. Performance Insights
app.get("/api/performance-insights", async (req, res) => {
  try {
    const insights = await PerformanceInsight.findAll({
      where: { active: true },
    });
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. Aggregate Stats
app.get("/api/stats/load-stats", async (req, res) => {
  try {
    const players = await Player.findAll({
      include: [{ model: Wellness, limit: 1, order: [["date", "DESC"]] }],
    });

    const data = players.map((p) => {
      const lastWellness = p.Wellnesses?.[0];
      // Mock load calculation: fatigue + stress + soreness normalized
      const loadValue = lastWellness
        ? lastWellness.fatigue * 50 +
          lastWellness.stress * 30 +
          lastWellness.soreness * 20
        : Math.floor(Math.random() * 900); // Fallback for demo

      return {
        player: p.name.split(" ")[0],
        load: loadValue,
        limit: 900,
      };
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/stats/coaching-insights", async (req, res) => {
  try {
    const players = await Player.findAll();
    // In a real app, this would be complex SQL or AI logic
    // Mocking leaderboard and alerts based on available data
    const insights = {
      leaderboard: players.slice(0, 3).map((p, i) => ({
        name: p.name,
        score: (9.5 - i * 0.4).toFixed(1),
      })),
      alerts: [
        {
          message: "⚠️ Fatiga muscular detectada en Luca Modric.",
          color: "#ff6b6b",
        },
      ],
    };
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 14. Scouting Reports
app.get("/api/scouting/reports", async (req, res) => {
  try {
    const reports = await ScoutingReport.findAll({
      order: [["rating", "DESC"]],
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/scouting/reports", async (req, res) => {
  try {
    const report = await ScoutingReport.create(req.body);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/scouting/reports/:id", async (req, res) => {
  try {
    await ScoutingReport.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 15. Market Values
app.get("/api/market-values", async (req, res) => {
  try {
    const values = await MarketValue.findAll({
      include: [{ model: Player, attributes: ["name"] }],
      order: [["last_updated", "DESC"]],
    });
    res.json(values);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 16. Rehabilitation Exercises
app.get("/api/rehabilitation/exercises", async (req, res) => {
  try {
    const exercises = await RehabilitationExercise.findAll({
      include: [{ model: Player, attributes: ["name"] }],
      order: [
        ["date", "DESC"],
        ["phase", "ASC"],
      ],
    });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/rehabilitation/exercises", async (req, res) => {
  try {
    const exercise = await RehabilitationExercise.create(req.body);
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/rehabilitation/exercises/:id", async (req, res) => {
  try {
    await RehabilitationExercise.update(req.body, {
      where: { id: req.params.id },
    });
    const updated = await RehabilitationExercise.findByPk(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 17. Wellness Summary (for all players)
app.get("/api/wellness-summary", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const wellnessRecords = await Wellness.findAll({
      where: { date: today },
      include: [{ model: Player, attributes: ["name"] }],
    });

    const summary = wellnessRecords.map((w) => {
      const data = w.toJSON();
      return {
        player_id: data.player_id,
        name: data.Player ? data.Player.name : "Unknown",
        sleep: data.sleep,
        fatigue: data.fatigue,
        stress: data.stress,
        soreness: data.soreness,
        mood: data.mood,
      };
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Database Connection and Server Start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync();
    console.log("Models synchronized.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
