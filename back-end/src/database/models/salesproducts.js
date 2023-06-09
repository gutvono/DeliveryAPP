'use strict';
const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('SalesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: {
          tableName: 'sales'
        },
        key: 'id'
      },
      field: 'sale_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: {
          tableName: 'products'
        },
        key: 'id'
      },
      field: 'product_id',
    },
    quantity: DataTypes.INTEGER
  }, {
    sequelize: db,
    tableName: 'sales_products',
    modelName: 'salesProducts',
    underscored: true,
    timestamps: false,
  });

  salesProducts.associate = (models) => {
    salesProducts.belongsTo(
      models.Sales,
      { foreignKey: 'saleId' },
    );
    salesProducts.belongsToMany(
      models.Products,
      {
        foreignKey: 'productId',
        through: 'SalesProducts'
      },
    );
  }

  return salesProducts;
};
