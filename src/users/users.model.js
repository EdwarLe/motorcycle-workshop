import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";
import { encryptedPassword } from "../config/plugins/encripted-password.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "user_id",
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("employee", "customer"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("available", "unavailable", "disable"),
      allowNull: false,
      defaultValue: "available",
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password);
      },
    },
  }
);

export default User;
