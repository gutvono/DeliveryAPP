require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

const createToken = (data) => {
  const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
  try {
     const data = jwt.verify(token, JWT_SECRET);
      
      return { type: null, result: data };
  } catch (_error) {
      const err = new Error('Expired or invalid token');
      return { type: err, result: null };
  }
};
const decodeToken = (token) => {
  const { payload: { data: { email } } } = jwt.decode(token, { complete: true });
  return email;
};

module.exports = {
  createToken,
  validateToken,
  decodeToken,
};
