const service = require('../services/seller.service');

async function getAOrder(req, res) {
  const { id } = req.params;
  const { order, error } = await service.getAOrder(Number(id));
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(200).json(order);
}

async function getAllOrders(req, res) {
  const user = req.requestingUser;
  const { orders, error } = await service.getAllOrders(user);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(200).json(orders);
}

module.exports = {
  getAOrder,
  getAllOrders,
};
