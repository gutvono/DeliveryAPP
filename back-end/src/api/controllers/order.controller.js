const service = require('../services/order.service');

async function getAOrder(req, res) {
  const { id } = req.params;
  const order = await service.getAOrder(id);
  res.status(200).json(order);
}

module.exports = {
  getAOrder,
};
