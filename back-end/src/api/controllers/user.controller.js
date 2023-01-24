const service = require('../services/user.service');

async function userLogin(req, res) {
  const userData = req.body;
  const { token, error } = await service.userLogin(userData);
  if (error) {
    return res.status(404).json({ message: 'Invalid email or password' });
  }
  res.status(200).json({ token });
}

async function userRegister(req, res) {
  const userData = req.body;
  const { token, error } = await service.userRegister(userData);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(201).json({ token });
}

module.exports = {
  userLogin,
  userRegister,
};
