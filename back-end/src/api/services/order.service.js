const { Products, Sales, SalesProducts, Users } = require('../../database/models');

async function getAOrder(id) {
  const order = await SalesProducts.findAll({ 
    where: { saleId: id },
    includes: [
      {
        model: Sales,
        attributes: ['sellerId', 'totalPrice', 'saleDate', 'status'],
        includes: [{ model: Users, attributes: ['name'] }],
      },
      {
        model: Products,
        attributes: ['price', 'name'],
      },
    ],
  });
  return order;
}

module.exports = {
  getAOrder,
};
