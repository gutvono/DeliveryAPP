function validateRegisterFields(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ message: 'There are some fields missing!' });
  }
  next();
}

module.exports = validateRegisterFields;
