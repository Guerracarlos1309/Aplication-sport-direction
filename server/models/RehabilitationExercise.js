import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Player from "./Player.js";

const RehabilitationExercise = sequelize.define(
  "RehabilitationExercise",
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
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "players",
        key: "id",
      },
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 3,
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "rehabilitation_exercises",
    timestamps: true,
  },
);

// Relationships
RehabilitationExercise.belongsTo(Player, { foreignKey: "player_id" });
Player.hasMany(RehabilitationExercise, { foreignKey: "player_id" });

export default RehabilitationExercise;
