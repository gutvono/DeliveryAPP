const service = require('../services/user.service');

async function userLogin(req, res) {
  console.log('controller');
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
