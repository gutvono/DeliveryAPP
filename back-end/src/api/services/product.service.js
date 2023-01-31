const { Products } = require('../../database/models');

async function getAllProducts() {
  const productList = await Products.findAll();
  console.log(productList);
  return { productList };
}

module.exports = {
  getAllProducts,
};
