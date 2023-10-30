import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Error = sequelize.define("errors", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },

  status: {
    allowNull: true,
    type: DataTypes.STRING(10),
  },

  message: {
    allowNull: true,
    type: DataTypes.TEXT,
  },

  stack: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
});

export default Error;
