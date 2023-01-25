const md5 = require('md5');
const { Users } = require('../../database/models');
const { createToken } = require('../utils/jwt');

async function userLogin({ email, password }) {
  const hashPassword = md5(password);
  const user = await Users.findOne({ where: { email, password: hashPassword } });
  if (!user) {
    return { error: { status: 404, message: 'User not found' } };
  }
  const token = createToken({ email, password, role: user.role });
  return { userInfo: { name: user.name, email, role: user.role, token } };
}

module.exports = {
  userLogin,
};
