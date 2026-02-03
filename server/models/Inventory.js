import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Inventory = sequelize.define(
  "Inventory",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    unit: { type: DataTypes.STRING(20), defaultValue: "unid." },
  },
  { tableName: "inventory", timestamps: false },
);

export default Inventory;
