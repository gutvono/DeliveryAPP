const service = require('../services/sale.service');

async function registerNewSale(req, res) {
  const saleData = req.body;
  const token = req.headers.authorization;
  const { success, error } = await service.registerNewSale(saleData, token);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(201).json(success);
}

module.exports = {
  registerNewSale,
};
