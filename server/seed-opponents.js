import sequelize from "./config/database.js";
import Opponent from "./models/Opponent.js";

const seedOpponents = async () => {
  try {
    await Opponent.sync({ force: true });

    await Opponent.create({
      name: "Real Valladolid",
      formation: "4-2-3-1",
      style: "Contraataque rápido",
      strength: "Transiciones ofensivas, Juego aéreo",
      weakness: "Espacios tras los laterales, Concentración en faltas",
      key_players: "Kike Pérez, Monchu",
      threat_level: 4,
      last_matches: "W,L,W,D,W",
      coach: "Paulo Pezzolano",
      plan_of_action: "Presión alta tras pérdida y explotar carriles externos.",
    });

    await Opponent.create({
      name: "CD Leganés",
      formation: "5-3-2",
      style: "Bloque bajo defensivo",
      strength: "Solidez defensiva, Disciplina táctica",
      weakness: "Baja posesión, Poca efectividad en tiros largos",
      key_players: "Miguel de la Fuente, Portillo",
      threat_level: 4,
      last_matches: "W,W,W,D,L",
      coach: "Borja Jiménez",
      plan_of_action:
        "Paciencia en la circulación. Mover el balón de lado a lado para desajustar su línea de 5.",
    });

    console.log("Opponents seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding opponents:", err);
    process.exit(1);
  }
};

seedOpponents();
