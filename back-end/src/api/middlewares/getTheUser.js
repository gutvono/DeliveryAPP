const { decodeToken } = require('../utils/jwt');

function getTheUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }
  const user = decodeToken(token);
  req.requestingUser = user;
  next();
}

module.exports = getTheUser;
