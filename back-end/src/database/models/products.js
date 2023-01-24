'use strict';
const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('Products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING
  }, {
    sequelize: db,
    underscored: true,
    modelName: 'products',
    tableName: 'products',
    timestamps: false,
  });

  return products;
};
