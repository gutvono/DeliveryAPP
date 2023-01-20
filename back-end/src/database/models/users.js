'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {}
  users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: { 
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'users',
    tableName: 'users',
  });
  return users;
};