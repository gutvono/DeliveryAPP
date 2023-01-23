const sequelize = require('sequelize')
const { users } = require('../database/models')

async function login({email, password}) {
  const user = await new users();
  console.log(user);
}

module.exports = login;