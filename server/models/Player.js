import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Player = sequelize.define(
  "Player",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: "No Convocado",
    },
    medical_status: {
      type: DataTypes.STRING(255),
      defaultValue: "Apto",
    },
    prognosis: {
      type: DataTypes.STRING(100),
      defaultValue: "-",
    },
    last_review: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    callup_acknowledged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    height: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    preferred_foot: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    jersey_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "players",
    timestamps: false,
  },
);

export default Player;
