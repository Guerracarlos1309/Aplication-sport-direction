import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ScoutingReport = sequelize.define(
  "ScoutingReport",
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    club: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
      defaultValue: 5.0,
    },
    strengths: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    market_value: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  },
  {
    tableName: "scouting_reports",
    timestamps: true,
  },
);

export default ScoutingReport;
