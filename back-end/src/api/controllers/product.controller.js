const service = require('../services/product.service');

async function getAllProducts(_req, res) {
  const { productList, error } = await service.getAllProducts();
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(200).json(productList);
}

module.exports = {
  getAllProducts,
};
