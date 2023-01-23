require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
  try {
     const data = jwt.verify(token, process.env.JWT_SECRET);
      
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
