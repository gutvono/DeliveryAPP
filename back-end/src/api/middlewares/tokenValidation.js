const { decodeToken } = require('../utils/jwt');

function tokenValidation(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: 'Token must be required' });
  }
  const validated = decodeToken(token);
  if (!validated) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  next();
}

module.exports = tokenValidation;
