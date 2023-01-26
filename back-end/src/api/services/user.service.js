const md5 = require('md5');
const Joi = require('joi');
const { Users } = require('../../database/models');
const { createToken } = require('../utils/jwt');

const createUserSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

async function userLogin({ email, password }) {
  const hashPassword = md5(password);
  const user = await Users.findOne({ where: { email, password: hashPassword } });
  if (!user) {
    return { error: { status: 404, message: 'User not found' } };
  }
  const token = createToken({ email, password, role: user.role });
  return { userInfo: { name: user.name, email, role: user.role, token } };
}

async function userRegister(data) {
  const validation = createUserSchema.validate(data);
  if (validation.error) {
    return { error: { status: 404, message: validation.error.message } };
  }

  const user = await Users.findOne({ where: { email: data.email } });
  if (user) {
    return { error: { status: 409, message: 'User already exists' } };
  }

  const { password: pass } = data;
  const hashPassword = md5(pass);
  await Users.create({
    name: data.name, email: data.email, password: hashPassword, role: 'customer',
  });

  // const token = createToken({ email, password, role });
  return { response: 'Successfully registered user' };
}

module.exports = {
  userLogin,
  userRegister,
};
