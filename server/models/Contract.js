import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Contract = sequelize.define("Contract", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // e.g., "Jugador (Pro)", "Entrenador"
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  annual_value: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
});

export default Contract;
