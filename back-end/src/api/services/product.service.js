const { Products } = require('../../database/models');

async function getAllProducts() {
  const productList = await Products.findAll();
  return { productList };
}

module.exports = {
  getAllProducts,
};
