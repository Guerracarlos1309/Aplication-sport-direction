import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Match = sequelize.define("Match", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  opponent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.STRING,
    defaultValue: "0 - 0",
  },
  possession: {
    type: DataTypes.STRING,
    defaultValue: "50%",
  },
  shots: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  passing: {
    type: DataTypes.STRING,
    defaultValue: "70%",
  },
  analysis_points: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  time: {
    type: DataTypes.STRING,
    defaultValue: "20:00",
  },
  venue: {
    type: DataTypes.STRING,
    defaultValue: "Campo Principal",
  },
  match_type: {
    type: DataTypes.STRING,
    defaultValue: "Oficial",
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});

export default Match;
