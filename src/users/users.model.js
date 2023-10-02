import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const User = sequelize.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'user_id'
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM('employee', 'customer'),
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('available', 'unavailable'),
        allowNull: false,
        defaultValue: 'available'
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['name', 'email']
        }
    ]
})

export default User