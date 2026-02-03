import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Player from "./Player.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Player,
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  },
);

// Define Association
User.belongsTo(Player, { foreignKey: "player_id", onDelete: "SET NULL" });
Player.hasOne(User, { foreignKey: "player_id" });

export default User;
