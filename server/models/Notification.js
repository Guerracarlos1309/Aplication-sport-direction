import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("info", "success", "warning", "danger"),
    defaultValue: "info",
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // If null, it could be a system-wide notification
  },
});

export default Notification;
