const db = require('.');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('Users', {
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
    sequelize: db,
    modelName: 'users',
    tableName: 'users',
  });
  
  return users;
};
