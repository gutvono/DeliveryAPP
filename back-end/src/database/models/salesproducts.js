'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salesProducts extends Model {
    static associate(models) {
      salesProducts.belongsTo(models.sales,
        {foreignKey: 'id', as: 'saleId'});
      salesProducts.belongsTo(models.products,
        {foreignKey: 'id', as: 'productId'})
    }
  }
  salesProducts.init({
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'salesProducts',
    modelName: 'salesProducts',
    underscored: true,
    timestamps: false,
  });
  return salesProducts;
};