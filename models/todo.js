const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        text: { type: DataTypes.STRING, allowNull: false },
    };


    return sequelize.define('Todo', attributes);
}