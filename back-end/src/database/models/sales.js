'use strict';
const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('Sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      field: 'user_id',
    },
    sellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      field: 'seller_id',
    },
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize: db,
    underscored: true,
    modelName: 'sales',
    tableName: 'sales',
    timestamps: false,
  });

  sales.associate = (models) => {
    sales.hasMany(
      models.SalesProducts,
    );
    sales.belongsTo(
      models.Users,
      { foreignKey: 'userId' },
    );
    sales.belongsTo(
      models.Users,
      { foreignKey: 'sellerId' },
    );
  };

  return sales;
};
