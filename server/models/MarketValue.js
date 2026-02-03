import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Player from "./Player.js";

const MarketValue = sequelize.define(
  "MarketValue",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "players",
        key: "id",
      },
    },
    internal_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    market_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trend: {
      type: DataTypes.ENUM("up", "down", "stable"),
      defaultValue: "stable",
    },
    last_updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "market_values",
    timestamps: true,
  },
);

// Relationships
MarketValue.belongsTo(Player, { foreignKey: "player_id" });
Player.hasOne(MarketValue, { foreignKey: "player_id" });

export default MarketValue;
