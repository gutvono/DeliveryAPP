'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {}
  }
  products.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'products',
    tableName: 'products',
    timestamps: false,
  });
  return products;
};