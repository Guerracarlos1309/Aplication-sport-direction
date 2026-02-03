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
  },
  {
    tableName: "players",
    timestamps: false,
  },
);

export default Player;
