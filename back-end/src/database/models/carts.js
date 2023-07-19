const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define('Carts', {
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
    timestamps: false,
    sequelize: db,
    modelName: 'carts',
    tableName: 'carts',
  });
  
  return carts;
};
