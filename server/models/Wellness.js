import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Player from "./Player.js";

const Wellness = sequelize.define(
  "Wellness",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    player_id: {
      type: DataTypes.INTEGER,
      references: { model: Player, key: "id" },
      allowNull: false,
    },
    date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    sleep: { type: DataTypes.INTEGER },
    fatigue: { type: DataTypes.INTEGER },
    stress: { type: DataTypes.INTEGER },
    soreness: { type: DataTypes.INTEGER },
    mood: { type: DataTypes.INTEGER },
  },
  {
    tableName: "wellness",
    timestamps: false,
    indexes: [{ unique: true, fields: ["player_id", "date"] }],
  },
);

Wellness.belongsTo(Player, { foreignKey: "player_id", onDelete: "CASCADE" });
Player.hasMany(Wellness, { foreignKey: "player_id" });

export default Wellness;
