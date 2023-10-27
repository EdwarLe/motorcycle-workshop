import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Repair = sequelize.define("repair", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    //color: {
    //     type: DataTypes.STRING(20),
    //     allowNull: false
    // },

    motorsNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    // brand: {
    //     type: DataTypes.STRING(20),
    //     allowNull: false
    // },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    }
})

export default Repair