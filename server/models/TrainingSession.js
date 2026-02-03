import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TrainingSession = sequelize.define(
  "TrainingSession",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    type: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "training_sessions", timestamps: false },
);

export default TrainingSession;
