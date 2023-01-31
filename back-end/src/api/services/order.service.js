const { Products, Sales, SalesProducts, Users } = require('../../database/models');

async function getAOrder(id) {
  const sale = (await Sales.findOne({ where: { id },
    attributes: ['sellerId', 'totalPrice', 'saleDate', 'status'] })).dataValues;
  sale.sellerName = (await Users.findOne({ where: { id: sale.sellerId },
    attributes: ['name'] })).name;
  delete sale.sellerId;
  sale.totalPrice = Number(sale.totalPrice);
  const allProducts = await Products.findAll({});
  const soldProducts = await SalesProducts.findAll({ 
    where: { saleId: id }, attributes: ['productId', 'quantity'] });
  const products = soldProducts.map(({ productId, quantity }) => {
    const match = allProducts.filter((e) => e.id === productId)['0'].dataValues;
    match.price = Number(match.price);
    delete match.urlImage;
    return { ...match, quantity };
  });
  return { ...sale, products };
}

module.exports = {
  getAOrder,
};
