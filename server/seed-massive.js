import sequelize from "./config/database.js";
import User from "./models/User.js";
import Player from "./models/Player.js";
import TrainingSession from "./models/TrainingSession.js";
import Wellness from "./models/Wellness.js";
import Payment from "./models/Payment.js";
import Inventory from "./models/Inventory.js";
import ScoutingObjective from "./models/ScoutingObjective.js";
import Match from "./models/Match.js";
import Contract from "./models/Contract.js";
import PerformanceInsight from "./models/PerformanceInsight.js";
import ScoutingReport from "./models/ScoutingReport.js";
import MarketValue from "./models/MarketValue.js";
import RehabilitationExercise from "./models/RehabilitationExercise.js";

const seedDatabase = async () => {
  try {
    console.log("🔄 Conectando a la base de datos...");
    await sequelize.authenticate();
    console.log("✅ Conexión establecida");

    console.log("🔄 Sincronizando modelos...");
    await sequelize.sync({ force: true });
    console.log("✅ Modelos sincronizados (Base de datos limpiada)");

    // ==================== JUGADORES (50+) ====================
    console.log("🔄 Creando 50+ jugadores...");
    const firstNames = [
      "Luka",
      "Thibaut",
      "Vinícius",
      "Antonio",
      "David",
      "Ferland",
      "Dani",
      "Federico",
      "Eduardo",
      "Aurélien",
      "Rodrygo",
      "Jude",
      "Kylian",
      "Joselu",
      "Brahim",
      "Andriy",
      "Eder",
      "Nacho",
      "Lucas",
      "Fran",
      "Arda",
      "Kepas",
      "Isco",
      "Sergio",
      "Karim",
      "Cristiano",
      "Gareth",
      "Casemiro",
      "Raphael",
      "Marcelo",
      "Keylor",
      "Pepe",
      "Mesut",
      "Angel",
      "Xabi",
      "Gonzalo",
      "Kaka",
      "Fabio",
      "Raul",
      "Guti",
      "Iker",
      "Roberto",
      "Zinedine",
      "Luis",
      "David",
      "Ronaldo",
      "Michael",
      "Steve",
      "Claude",
    ];
    const lastNames = [
      "Modrić",
      "Courtois",
      "Júnior",
      "Rüdiger",
      "Alaba",
      "Mendy",
      "Carvajal",
      "Valverde",
      "Camavinga",
      "Tchouaméni",
      "Goes",
      "Bellingham",
      "Mbappé",
      "Mato",
      "Díaz",
      "Lunin",
      "Militão",
      "Fernández",
      "Vázquez",
      "García",
      "Güler",
      "Arrizabalaga",
      "Alarcón",
      "Ramos",
      "Benzema",
      "Ronaldo",
      "Bale",
      "Casemiro",
      "Varane",
      "Vieira",
      "Navas",
      "Pepe",
      "Özil",
      "Di María",
      "Alonso",
      "Higuaín",
      "Leite",
      "Coentrão",
      "González",
      "Hernández",
      "Casillas",
      "Carlos",
      "Zidane",
      "Figo",
      "Beckham",
      "Nazário",
      "Owen",
      "McManaman",
      "Makelele",
    ];
    const positions = ["POR", "LD", "LI", "DFC", "MC", "MCO", "EI", "ED", "DC"];

    const playersData = [];
    for (let i = 0; i < 55; i++) {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      playersData.push({
        name: `${firstName} ${lastName}`,
        position: positions[Math.floor(Math.random() * positions.length)],
        age: Math.floor(Math.random() * 18) + 17,
        status: Math.random() > 0.8 ? "Lesionado" : "Convocado",
        medical_status: Math.random() > 0.9 ? "Esguince" : "Apto",
        prognosis: Math.random() > 0.9 ? "2 semanas" : "-",
      });
    }
    const players = await Player.bulkCreate(playersData);
    console.log(`✅ ${players.length} jugadores creados`);

    // ==================== USUARIOS ====================
    console.log("🔄 Creando usuarios...");
    const users = await User.bulkCreate([
      { username: "dt", password: "1234", role: "DT", player_id: null },
      { username: "player", password: "1234", role: "Jugador", player_id: 1 },
      { username: "star", password: "1234", role: "Jugador", player_id: 13 },
    ]);
    console.log(`✅ ${users.length} usuarios creados`);

    // ==================== SESIONES (30+) ====================
    console.log("🔄 Creando 30+ sesiones de entrenamiento...");
    const sessionTypes = [
      "Táctico",
      "Físico",
      "Técnico",
      "Recuperación",
      "Gimnasio",
    ];
    const sessionTitles = [
      "Posesión Pro",
      "Resistencia Aeróbica",
      "Finalización 1v1",
      "Recuperación Post-Partido",
      "Fuerza Máxima",
      "Transiciones Rápidas",
      "Estrategia Balón Parado",
    ];
    const sessionsData = [];
    for (let i = 0; i < 35; i++) {
      sessionsData.push({
        title: sessionTitles[Math.floor(Math.random() * sessionTitles.length)],
        type: sessionTypes[Math.floor(Math.random() * sessionTypes.length)],
        description: `Descripción detallada de la sesión ${i + 1} para el equipo profesional.`,
        date: new Date(Date.now() + (i - 10) * 24 * 60 * 60 * 1000),
      });
    }
    await TrainingSession.bulkCreate(sessionsData);
    console.log(`✅ ${sessionsData.length} sesiones creadas`);

    // ==================== WELLNESS (30 días para todos) ====================
    console.log("🔄 Creando registros de wellness (últimos 30 días)...");
    const wellnessData = [];
    const now = new Date();
    for (let p = 0; p < players.length; p++) {
      for (let d = 0; d < 30; d++) {
        const date = new Date();
        date.setDate(now.getDate() - d);
        wellnessData.push({
          player_id: players[p].id,
          date: date.toISOString().split("T")[0],
          sleep: Math.floor(Math.random() * 4) + 6,
          fatigue: Math.floor(Math.random() * 5) + 1,
          stress: Math.floor(Math.random() * 5) + 1,
          soreness: Math.floor(Math.random() * 5) + 1,
          mood: Math.floor(Math.random() * 5) + 1,
        });
      }
    }
    await Wellness.bulkCreate(wellnessData);
    console.log(`✅ ${wellnessData.length} registros de wellness creados`);

    // ==================== PARTIDOS (20+) ====================
    console.log("🔄 Creando 20+ partidos...");
    const opponents = [
      "FC Barcelona",
      "Atlético Madrid",
      "Sevilla FC",
      "Real Sociedad",
      "Athletic Club",
      "Valencia CF",
      "Villarreal CF",
      "Real Betis",
      "Osasuna",
      "Girona FC",
      "Celta de Vigo",
      "Rayo Vallecano",
      "Getafe CF",
      "Mallorca",
      "Almería",
      "Granada CF",
      "Las Palmas",
      "Cádiz CF",
      "Deportivo Alavés",
      "Manchester City",
      "Bayern Munich",
      "Liverpool FC",
      "Inter Milan",
      "Paris Saint-Germain",
    ];
    const matchesData = [];
    for (let i = 0; i < 25; i++) {
      const scoreH = Math.floor(Math.random() * 5);
      const scoreA = Math.floor(Math.random() * 3);
      matchesData.push({
        opponent: opponents[i % opponents.length],
        score: `${scoreH}-${scoreA}`,
        date: new Date(Date.now() - (i + 1) * 7 * 24 * 60 * 60 * 1000),
        possession: `${Math.floor(Math.random() * 30) + 40}%`,
        shots: `${Math.floor(Math.random() * 15) + 5}`,
        passing: `${Math.floor(Math.random() * 20) + 75}%`,
        analysis_points:
          "Buen control de balón,Presión alta efectiva,Necesidad de mejorar repliegue",
      });
    }
    await Match.bulkCreate(matchesData);
    console.log(`✅ ${matchesData.length} partidos creados`);

    // ==================== CONTRATOS Y PAGOS ====================
    console.log("🔄 Creando contratos y pagos...");
    const contractsData = players.slice(0, 20).map((p) => ({
      name: p.name,
      type: "Jugador",
      start_date: "2023-07-01",
      end_date: "2027-06-30",
      annual_value: Math.floor(Math.random() * 10000000) + 500000,
    }));
    await Contract.bulkCreate(contractsData);

    const paymentsData = [];
    for (let i = 0; i < 24; i++) {
      paymentsData.push({
        concept: `Salarios Mes ${i + 1}`,
        amount: Math.floor(Math.random() * 5000000) + 1000000,
        status: i < 20 ? "paid" : "pending",
        due_date: new Date(Date.now() + (i - 20) * 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      });
    }
    await Payment.bulkCreate(paymentsData);
    console.log("✅ Datos financieros creados");

    // ==================== SCOUTING ====================
    console.log("🔄 Creando scouting data...");
    const scoutingReportsData = [];
    for (let i = 0; i < 15; i++) {
      scoutingReportsData.push({
        name: `Prospecto ${i + 1}`,
        age: 18 + i,
        position: positions[i % positions.length],
        club: "Club Internacional",
        rating: (Math.random() * 3 + 7).toFixed(1),
        strengths: ["Velocidad", "Técnica", "Fuerza"],
        market_value: `€${Math.floor(Math.random() * 50) + 10}M`,
        notes:
          "Jugador con alta proyección internacional observador en torneos juveniles.",
      });
    }
    await ScoutingReport.bulkCreate(scoutingReportsData);

    const scoutingObjectivesData = scoutingReportsData.slice(0, 8).map((r) => ({
      name: r.name,
      position: r.position,
      rating: Math.floor(r.rating * 10),
    }));
    await ScoutingObjective.bulkCreate(scoutingObjectivesData);
    console.log("✅ Scouting data creado");

    // ==================== INVENTARIO ====================
    const inventoryData = [
      { name: "Balones Adidas 2026", stock: 100, unit: "unidades" },
      { name: "Petos Entrenamiento", stock: 200, unit: "unidades" },
      { name: "GPS Performance", stock: 60, unit: "unidades" },
      { name: "Botas Gama Alta", stock: 40, unit: "pares" },
      { name: "Suplementos Proteicos", stock: 500, unit: "kg" },
    ];
    await Inventory.bulkCreate(inventoryData);

    // ==================== REHABILITATION ====================
    const injuredPlayers = players.filter((p) => p.status === "Lesionado");
    const rehabData = injuredPlayers.flatMap((p) => [
      {
        name: "Fisioterapia",
        player_id: p.id,
        duration: "45 min",
        phase: 1,
        completed: true,
        date: new Date().toISOString().split("T")[0],
      },
      {
        name: "Trabajo en Piscina",
        player_id: p.id,
        duration: "30 min",
        phase: 2,
        completed: false,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    await RehabilitationExercise.bulkCreate(rehabData);

    console.log("\n🚀 ¡BASE DE DATOS POBLADA CON ÉXITO! (Versión Masiva)");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
