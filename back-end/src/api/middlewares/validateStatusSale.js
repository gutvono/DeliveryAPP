const ACCEPTABLE_VALUES = [/Pendente/i, /Preparando/i, /Em Trânsito/i, /Entregue/i];

function validateStatusSale(req, res, next) {
  const { status } = req.body;
  const tests = ACCEPTABLE_VALUES.map((validStatus) => validStatus.test(status));
  const validated = tests.some((i) => i);
  if (!validated) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const formattedStatus = String(ACCEPTABLE_VALUES[tests.indexOf(true)]);
  req.body.status = formattedStatus
    .replace(/\//g, '')
    .slice(0, formattedStatus.length - 3);
  console.log(formattedStatus.length);
  next();
}

module.exports = validateStatusSale;
