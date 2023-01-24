'use strict';
const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('Sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: DataTypes.DECIMAL,
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
    sales.belongsTo(
      models.Users,
      { foreignKey: 'id', as: 'userId' },
    );
    sales.belongsTo(
      models.Users,
      { foreignKey: 'id', as: 'sellerId' },
    );
  };

  return sales;
};
