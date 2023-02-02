const service = require('../services/sale.service');
const { decodeToken } = require('../utils/jwt');

async function registerNewSale(req, res) {
  const saleData = req.body;
  const token = req.headers.authorization;
  const { success, error } = await service.registerNewSale(saleData, token);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(201).json(success);
}

async function updateSaleStatus(req, res) {
  const { id } = req.params;
  const email = decodeToken(req.headers.authorization);
  const { status } = req.body;
  const { success, error } = await service.updateSaleStatus(id, email, status);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(202).json(success);
}

module.exports = {
  registerNewSale,
  updateSaleStatus,
};
