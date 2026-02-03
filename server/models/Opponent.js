import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Opponent = sequelize.define(
  "Opponent",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    formation: {
      type: DataTypes.STRING,
      defaultValue: "4-4-2",
    },
    style: {
      type: DataTypes.STRING,
      defaultValue: "Equilibrado",
    },
    strength: {
      type: DataTypes.TEXT, // Comma separated strengths
    },
    weakness: {
      type: DataTypes.TEXT, // Comma separated weaknesses
    },
    key_players: {
      type: DataTypes.TEXT, // JSON or comma separated names
    },
    threat_level: {
      type: DataTypes.INTEGER,
      defaultValue: 3, // 1-5
    },
    last_matches: {
      type: DataTypes.STRING, // e.g. "W,D,L,W,W"
    },
    coach: {
      type: DataTypes.STRING,
    },
    plan_of_action: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "opponents",
    timestamps: true,
  },
);

export default Opponent;
