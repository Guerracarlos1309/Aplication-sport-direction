import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Settings = sequelize.define("Settings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING,
    defaultValue: "Sport Direction FC",
  },
  team_short_name: {
    type: DataTypes.STRING,
    defaultValue: "SDFC",
  },
  logo_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  primary_color: {
    type: DataTypes.STRING,
    defaultValue: "#00f2ff",
  },
  current_season: {
    type: DataTypes.STRING,
    defaultValue: "2025/2026",
  },
});

export default Settings;
