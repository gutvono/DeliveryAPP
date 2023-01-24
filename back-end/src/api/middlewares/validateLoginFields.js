function validateLoginFields(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: 'There are some fields missing!' });
  }
  next();
}

module.exports = validateLoginFields;
