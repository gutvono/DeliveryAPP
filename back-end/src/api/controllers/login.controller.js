const service = require('../services/LoginServices');

async function userLogin(req, res) {
  const userData = req.body;
  const { token, error } = await service.userLogin(userData);
  if (error) {
    return res.status(404).json({ message: 'Invalid email or password' });
  }
  res.status(200).json({ token });
}

module.exports = {
  userLogin,
};
