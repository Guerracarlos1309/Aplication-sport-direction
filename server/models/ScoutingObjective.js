import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ScoutingObjective = sequelize.define(
  "ScoutingObjective",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    rating: { type: DataTypes.INTEGER },
    position: { type: DataTypes.STRING(50) },
  },
  { tableName: "scouting_objectives", timestamps: false },
);

export default ScoutingObjective;
