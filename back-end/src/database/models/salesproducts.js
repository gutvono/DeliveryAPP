'use strict';
const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('SalesProducts', {
    quantity: DataTypes.INTEGER
  }, {
    sequelize: db,
    tableName: 'salesProducts',
    modelName: 'salesProducts',
    underscored: true,
    timestamps: false,
  });

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(
      models.Sales,
      { foreignKey: 'id', as: 'saleId' },
    );
    salesProducts.belongsTo(
      models.Products,
      { foreignKey: 'id', as: 'productId' },
    );
  }

  return salesProducts;
};
