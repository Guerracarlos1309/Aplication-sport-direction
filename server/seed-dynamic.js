import sequelize from "./config/database.js";
import Match from "./models/Match.js";
import Contract from "./models/Contract.js";
import PerformanceInsight from "./models/PerformanceInsight.js";
import TrainingSession from "./models/TrainingSession.js";

async function seedDynamic() {
  try {
    await sequelize.authenticate();
    console.log("Seeding Match, Contract, Insight, and Sessions data...");

    await Match.sync({ force: true });
    await PerformanceInsight.sync({ force: true });
    // TrainingSession sync might exist in other seed but let's ensure it has fields
    await TrainingSession.sync({ alter: true });

    await Match.create({
      opponent: "United FC",
      score: "2 - 1",
      possession: "58%",
      shots: 14,
      passing: "82%",
      analysis_points:
        "Excelente presión alta,Dificultad en transiciones,Eficiencia en ABP",
      date: new Date(),
      time: "21:00",
      venue: "Estadio Metropolitano",
      match_type: "Liga Oficial",
    });

    await Contract.create({
      name: "Carlos Ruiz",
      type: "Jugador (Pro)",
      start_date: "2024-01-01",
      end_date: "2027-12-31",
      annual_value: 2500000,
    });

    await TrainingSession.create({
      title: "Recuperación Post-Partido",
      type: "Físico",
      description: "Sesión regenerativa y fisioterapia.",
      location: "Gimnasio Norte",
      date: new Date(Date.now() + 86400000), // Tomorrow
    });

    await PerformanceInsight.create({
      type: "recommendation",
      content:
        "Tus niveles de recuperación son óptimos hoy. Los datos sugieren que puedes aumentar la carga de entrenamiento un 15% sin riesgo de lesión.",
      category: "Physical",
    });

    await PerformanceInsight.create({
      type: "nutrition",
      content:
        "Consumir carbohidratos complejos 3 horas antes del inicio para maximizar reservas de glucógeno.",
      category: "Diet",
    });

    console.log("Dynamic data seeded successfully!");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await sequelize.close();
  }
}

seedDynamic();
