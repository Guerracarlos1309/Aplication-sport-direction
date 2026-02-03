import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PerformanceInsight = sequelize.define(
  "PerformanceInsight",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING(50), allowNull: false }, // 'recommendation', 'alert', 'nutrition'
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING(50) }, // 'Physical', 'Mental', 'Diet'
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "performance_insights", timestamps: true },
);

export default PerformanceInsight;
