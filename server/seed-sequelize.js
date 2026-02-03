import sequelize from "./config/database.js";
import User from "./models/User.js";
import Player from "./models/Player.js";
import TrainingSession from "./models/TrainingSession.js";
import Wellness from "./models/Wellness.js";
import Payment from "./models/Payment.js";
import Inventory from "./models/Inventory.js";
import ScoutingObjective from "./models/ScoutingObjective.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database for seeding...");

    // Sync force: true to drop and recreate tables
    await sequelize.sync({ force: true });
    console.log("Tables recreated.");

    // 1. Create Players
    const player1 = await Player.create({
      name: "Carlos Guerra",
      position: "POR",
      status: "Convocado",
      medical_status: "Apto",
      prognosis: "En excelente forma",
    });

    const player2 = await Player.create({
      name: "Marcos Silva",
      position: "DEF",
      status: "Convocado",
      medical_status: "Apto",
    });

    const player3 = await Player.create({
      name: "Luca Modric",
      position: "MED",
      status: "Duda",
      medical_status: "Fatiga Muscular",
    });

    // 2. Create Users
    await User.create({
      username: "carlos",
      password: "1234", // In production, hash this!
      role: "Jugador",
      player_id: player1.id,
    });

    await User.create({
      username: "entrenador",
      password: "1234",
      role: "DT",
      player_id: null,
    });

    // 3. Create Training Sessions
    await TrainingSession.create({
      title: "Entrenamiento Táctico",
      type: "Táctico",
      description:
        "Preparación para el partido del domingo. Enfoque en defensa.",
      date: new Date(),
    });

    // 4. Create Wellness Data
    await Wellness.create({
      player_id: player1.id,
      date: new Date(),
      sleep: 8,
      fatigue: 3,
      stress: 2,
      soreness: 4,
      mood: 8,
    });

    // 5. Create Payments
    await Payment.create({
      concept: "Salario Enero",
      amount: 1500.0,
      status: "pending",
      due_date: new Date(new Date().setDate(new Date().getDate() + 5)),
    });

    // 6. Create Inventory
    await Inventory.create({
      name: "Balones Nike",
      stock: 20,
      unit: "unid.",
    });

    // 7. Scouting
    await ScoutingObjective.create({
      name: "Erling Haaland",
      rating: 95,
      position: "DEL",
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding Error:", error);
  } finally {
    await sequelize.close();
  }
}

seed();
