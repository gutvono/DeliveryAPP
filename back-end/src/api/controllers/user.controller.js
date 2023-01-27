const service = require('../services/user.service');

async function userLogin(req, res) {
  const userData = req.body;
  const { userInfo, error } = await service.userLogin(userData);
  if (error) {
    return res.status(404).json({ message: 'Invalid email or password' });
  }
  res.status(200).json(userInfo);
}

async function userRegister(req, res) {
  const userData = req.body;
  const { response, error } = await service.userRegister(userData);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(201).json({ response });
}

async function getSellers(_req, res) {
  const { sellers, error } = await service.getSellers();
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(200).json(sellers);
}

module.exports = {
  userLogin,
  userRegister,
  getSellers,
};
