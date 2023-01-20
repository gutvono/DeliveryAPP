'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    static associate(models) {
      sales.belongsTo(models.users,
        {foreignKey: 'id', as: 'userId'});
      sales.belongsTo(models.users,
        {foreignKey: 'id', as:'sellerId'});
      }
  }
  sales.init({
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
    sequelize,
    underscored: true,
    modelName: 'sales',
    tableName: 'sales',
    timestamps: false,
  });
  return sales;
};