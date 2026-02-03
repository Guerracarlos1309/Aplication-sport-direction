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
    await sequelize.sync({ force: true }); // WARNING: This drops all tables
    console.log("✅ Modelos sincronizados");

    // ==================== JUGADORES ====================
    console.log("🔄 Creando jugadores...");
    const players = await Player.bulkCreate([
      // Porteros
      {
        name: "Thibaut Courtois",
        position: "POR",
        age: 31,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Andriy Lunin",
        position: "POR",
        age: 24,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },

      // Defensas
      {
        name: "Dani Carvajal",
        position: "LD",
        age: 32,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Antonio Rüdiger",
        position: "DFC",
        age: 30,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "David Alaba",
        position: "DFC",
        age: 31,
        status: "Lesionado",
        medical_status: "Rotura ligamento cruzado",
        prognosis: "6 meses",
      },
      {
        name: "Ferland Mendy",
        position: "LI",
        age: 28,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Éder Militão",
        position: "DFC",
        age: 26,
        status: "Duda",
        medical_status: "Sobrecarga muscular",
        prognosis: "3 días",
      },

      // Centrocampistas
      {
        name: "Luka Modrić",
        position: "MC",
        age: 38,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Toni Kroos",
        position: "MC",
        age: 34,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Federico Valverde",
        position: "MC",
        age: 25,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Eduardo Camavinga",
        position: "MC",
        age: 21,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Aurélien Tchouaméni",
        position: "MC",
        age: 24,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },

      // Delanteros
      {
        name: "Vinícius Júnior",
        position: "EI",
        age: 23,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Rodrygo Goes",
        position: "ED",
        age: 23,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Joselu Mato",
        position: "DC",
        age: 33,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
      {
        name: "Brahim Díaz",
        position: "MCO",
        age: 24,
        status: "Convocado",
        medical_status: "Apto",
        prognosis: "-",
      },
    ]);
    console.log(`✅ ${players.length} jugadores creados`);

    // ==================== USUARIOS ====================
    console.log("🔄 Creando usuarios...");
    const users = await User.bulkCreate([
      {
        username: "dt",
        password: "1234",
        role: "DT",
        player_id: null,
      },
      {
        username: "courtois",
        password: "1234",
        role: "Jugador",
        player_id: 1,
      },
      {
        username: "vinicius",
        password: "1234",
        role: "Jugador",
        player_id: 13,
      },
      {
        username: "modric",
        password: "1234",
        role: "Jugador",
        player_id: 8,
      },
    ]);
    console.log(`✅ ${users.length} usuarios creados`);

    // ==================== SESIONES DE ENTRENAMIENTO ====================
    console.log("🔄 Creando sesiones de entrenamiento...");
    const sessions = await TrainingSession.bulkCreate([
      {
        title: "Posesión y Presión Alta",
        type: "Táctico",
        description:
          "Trabajo de posesión en espacios reducidos con presión tras pérdida",
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Velocidad y Potencia",
        type: "Físico",
        description: "Sprints de alta intensidad y trabajo de fuerza explosiva",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Finalización y Centros",
        type: "Técnico",
        description: "Trabajo de centros laterales y remates en área",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Regenerativo",
        type: "Recuperación",
        description: "Sesión de baja intensidad con estiramientos y piscina",
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✅ ${sessions.length} sesiones creadas`);

    // ==================== WELLNESS ====================
    console.log("🔄 Creando registros de wellness...");
    const today = new Date().toISOString().split("T")[0];
    const wellnessRecords = [];

    for (let i = 1; i <= players.length; i++) {
      wellnessRecords.push({
        player_id: i,
        date: today,
        sleep: Math.floor(Math.random() * 3) + 7, // 7-10
        fatigue: Math.floor(Math.random() * 5) + 1, // 1-5
        stress: Math.floor(Math.random() * 5) + 1, // 1-5
        soreness: Math.floor(Math.random() * 5) + 1, // 1-5
        mood: Math.floor(Math.random() * 3) + 3, // 3-5
      });
    }

    await Wellness.bulkCreate(wellnessRecords);
    console.log(`✅ ${wellnessRecords.length} registros de wellness creados`);

    // ==================== CONTRATOS ====================
    console.log("🔄 Creando contratos...");
    const contracts = await Contract.bulkCreate([
      {
        name: "Thibaut Courtois",
        type: "Jugador",
        start_date: "2018-08-09",
        end_date: "2026-06-30",
        annual_value: 12000000,
      },
      {
        name: "Vinícius Júnior",
        type: "Jugador",
        start_date: "2018-07-20",
        end_date: "2027-06-30",
        annual_value: 10000000,
      },
      {
        name: "Luka Modrić",
        type: "Jugador",
        start_date: "2012-08-27",
        end_date: "2025-06-30",
        annual_value: 8000000,
      },
      {
        name: "Federico Valverde",
        type: "Jugador",
        start_date: "2016-07-19",
        end_date: "2029-06-30",
        annual_value: 9000000,
      },
      {
        name: "Antonio Rüdiger",
        type: "Jugador",
        start_date: "2022-06-02",
        end_date: "2026-06-30",
        annual_value: 9000000,
      },
      {
        name: "Carlo Ancelotti",
        type: "Cuerpo Técnico",
        start_date: "2021-06-01",
        end_date: "2026-06-30",
        annual_value: 11000000,
      },
    ]);
    console.log(`✅ ${contracts.length} contratos creados`);

    // ==================== PAGOS ====================
    console.log("🔄 Creando pagos...");
    const payments = await Payment.bulkCreate([
      {
        concept: "Salarios Enero 2026",
        amount: 4500000,
        status: "paid",
        due_date: "2026-01-31",
      },
      {
        concept: "Salarios Febrero 2026",
        amount: 4500000,
        status: "pending",
        due_date: "2026-02-28",
      },
      {
        concept: "Equipamiento Nike Q1",
        amount: 250000,
        status: "pending",
        due_date: "2026-03-15",
      },
      {
        concept: "Mantenimiento Instalaciones",
        amount: 85000,
        status: "overdue",
        due_date: "2026-01-20",
      },
      {
        concept: "Servicios Médicos",
        amount: 120000,
        status: "paid",
        due_date: "2026-01-15",
      },
    ]);
    console.log(`✅ ${payments.length} pagos creados`);

    // ==================== INVENTARIO ====================
    console.log("🔄 Creando inventario...");
    const inventory = await Inventory.bulkCreate([
      { name: "Balones Entrenamiento", stock: 45, unit: "unidades" },
      { name: "Balones Partido", stock: 12, unit: "unidades" },
      { name: "Conos", stock: 120, unit: "unidades" },
      { name: "Petos Azules", stock: 25, unit: "unidades" },
      { name: "Petos Rojos", stock: 25, unit: "unidades" },
      { name: "Vallas Entrenamiento", stock: 30, unit: "unidades" },
      { name: "Botiquín Médico", stock: 5, unit: "kits" },
      { name: "Hielo Instantáneo", stock: 50, unit: "packs" },
      { name: "Vendas Elásticas", stock: 100, unit: "rollos" },
    ]);
    console.log(`✅ ${inventory.length} items de inventario creados`);

    // ==================== PARTIDOS ====================
    console.log("🔄 Creando partidos...");
    const matches = await Match.bulkCreate([
      {
        opponent: "FC Barcelona",
        score: "3-2",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        possession: "58%",
        shots: "18",
        passing: "89%",
        analysis_points:
          "Excelente presión alta en primeros 30 min,Dificultad en transiciones defensivas,Eficiencia notable en jugadas a balón parado",
      },
      {
        opponent: "Atlético Madrid",
        score: "2-1",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        possession: "52%",
        shots: "14",
        passing: "85%",
        analysis_points:
          "Control del medio campo efectivo,Falta de profundidad en ataque,Solidez defensiva en segunda mitad",
      },
      {
        opponent: "Sevilla FC",
        score: "4-0",
        date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        possession: "65%",
        shots: "22",
        passing: "91%",
        analysis_points:
          "Dominio total del partido,Excelente circulación de balón,Alta efectividad en definición",
      },
    ]);
    console.log(`✅ ${matches.length} partidos creados`);

    // ==================== SCOUTING OBJECTIVES (Shadow Team) ====================
    console.log("🔄 Creando objetivos de scouting...");
    const scoutingObjectives = await ScoutingObjective.bulkCreate([
      { name: "Erling Haaland", position: "DC", rating: 95 },
      { name: "Jude Bellingham", position: "MCO", rating: 92 },
      { name: "Alphonso Davies", position: "LI", rating: 88 },
      { name: "William Saliba", position: "DFC", rating: 87 },
      { name: "Declan Rice", position: "MC", rating: 86 },
    ]);
    console.log(`✅ ${scoutingObjectives.length} objetivos creados`);

    // ==================== SCOUTING REPORTS ====================
    console.log("🔄 Creando reportes de scouting...");
    const scoutingReports = await ScoutingReport.bulkCreate([
      {
        name: "Khvicha Kvaratskhelia",
        age: 23,
        position: "EI",
        club: "Napoli",
        rating: 8.5,
        strengths: ["Velocidad", "Regate", "Visión de juego"],
        market_value: "€80M",
        notes:
          "Extremo georgiano con gran proyección. Excelente en 1vs1 y creación de juego.",
      },
      {
        name: "Florian Wirtz",
        age: 21,
        position: "MCO",
        club: "Bayer Leverkusen",
        rating: 9.0,
        strengths: ["Técnica", "Pase", "Finalización"],
        market_value: "€120M",
        notes:
          "Mediapunta alemán de clase mundial. Recuperado de lesión grave, en su mejor momento.",
      },
      {
        name: "Lamine Yamal",
        age: 17,
        position: "ED",
        club: "FC Barcelona",
        rating: 9.5,
        strengths: ["Regate", "Velocidad", "Asistencias"],
        market_value: "€150M",
        notes:
          "Joya española con potencial ilimitado. Extremo desequilibrante con gran madurez.",
      },
      {
        name: "Jamal Musiala",
        age: 21,
        position: "MCO",
        club: "Bayern Munich",
        rating: 9.2,
        strengths: ["Conducción", "Creatividad", "Gol"],
        market_value: "€130M",
        notes:
          "Mediapunta alemán versátil. Excelente en espacios reducidos y finalización.",
      },
      {
        name: "Rafael Leão",
        age: 25,
        position: "EI",
        club: "AC Milan",
        rating: 8.8,
        strengths: ["Velocidad", "Potencia", "Definición"],
        market_value: "€90M",
        notes: "Extremo portugués explosivo. Gran capacidad de desborde y gol.",
      },
    ]);
    console.log(`✅ ${scoutingReports.length} reportes de scouting creados`);

    // ==================== MARKET VALUES ====================
    console.log("🔄 Creando valoraciones de mercado...");
    const marketValues = await MarketValue.bulkCreate([
      {
        player_id: 13, // Vinícius
        internal_value: "€150M",
        market_value: "€180M",
        trend: "up",
      },
      {
        player_id: 10, // Valverde
        internal_value: "€100M",
        market_value: "€90M",
        trend: "up",
      },
      {
        player_id: 11, // Camavinga
        internal_value: "€80M",
        market_value: "€85M",
        trend: "stable",
      },
      {
        player_id: 14, // Rodrygo
        internal_value: "€75M",
        market_value: "€70M",
        trend: "stable",
      },
      {
        player_id: 8, // Modrić
        internal_value: "€15M",
        market_value: "€10M",
        trend: "down",
      },
    ]);
    console.log(`✅ ${marketValues.length} valoraciones creadas`);

    // ==================== REHABILITATION EXERCISES ====================
    console.log("🔄 Creando ejercicios de rehabilitación...");
    const rehabExercises = await RehabilitationExercise.bulkCreate([
      {
        name: "Propiocepción y Equilibrio",
        player_id: 5, // Alaba
        duration: "20 min",
        phase: 1,
        completed: false,
        date: today,
      },
      {
        name: "Fortalecimiento Isométrico",
        player_id: 5, // Alaba
        duration: "30 min",
        phase: 2,
        completed: false,
        date: today,
      },
      {
        name: "Core y Estabilidad",
        player_id: 7, // Militão
        duration: "25 min",
        phase: 1,
        completed: true,
        date: today,
      },
      {
        name: "Movilidad Articular",
        player_id: 7, // Militão
        duration: "15 min",
        phase: 1,
        completed: false,
        date: today,
      },
    ]);
    console.log(
      `✅ ${rehabExercises.length} ejercicios de rehabilitación creados`,
    );

    // ==================== PERFORMANCE INSIGHTS ====================
    console.log("🔄 Creando insights de rendimiento...");
    const insights = await PerformanceInsight.bulkCreate([
      {
        type: "recommendation",
        content:
          "Tus niveles de recuperación son óptimos hoy. Considera aumentar la intensidad en el próximo entrenamiento.",
        active: true,
      },
      {
        type: "nutrition",
        content:
          "Maximiza tus reservas de glucógeno con carbohidratos complejos 3-4 horas antes del partido.",
        active: true,
      },
      {
        type: "alert",
        content:
          "Detectada fatiga muscular elevada en 3 jugadores. Considera sesión regenerativa.",
        active: true,
      },
    ]);
    console.log(`✅ ${insights.length} insights creados`);

    console.log("\n✅ ¡Base de datos poblada exitosamente!");
    console.log("\n📊 Resumen:");
    console.log(`   - ${players.length} jugadores`);
    console.log(`   - ${users.length} usuarios`);
    console.log(`   - ${sessions.length} sesiones de entrenamiento`);
    console.log(`   - ${wellnessRecords.length} registros de wellness`);
    console.log(`   - ${contracts.length} contratos`);
    console.log(`   - ${payments.length} pagos`);
    console.log(`   - ${inventory.length} items de inventario`);
    console.log(`   - ${matches.length} partidos`);
    console.log(`   - ${scoutingObjectives.length} objetivos de scouting`);
    console.log(`   - ${scoutingReports.length} reportes de scouting`);
    console.log(`   - ${marketValues.length} valoraciones de mercado`);
    console.log(`   - ${rehabExercises.length} ejercicios de rehabilitación`);
    console.log(`   - ${insights.length} insights de rendimiento`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
