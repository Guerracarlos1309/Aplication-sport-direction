import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    concept: { type: DataTypes.STRING(255), allowNull: false },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    status: { type: DataTypes.STRING(20), defaultValue: "pending" },
    due_date: { type: DataTypes.DATEONLY },
  },
  { tableName: "payments", timestamps: false },
);

export default Payment;
