const { sequelize } = require('../sequelize');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mobile_no: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
});

module.exports = Users;