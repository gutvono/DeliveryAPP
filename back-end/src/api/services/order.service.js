const { Products, Sales, SalesProducts, Users } = require('../../database/models');

async function getAOrder(id) {
  const sale = (await Sales.findOne({ where: { id },
    attributes: ['sellerId', 'totalPrice', 'saleDate', 'status'] })).dataValues;
  if (!sale) { return { error: { status: 400, message: 'Invalid id' } }; }
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
  return { order: { ...sale, products } };
}

async function getProducts(saleId) {
  const saleProductsIds = [...(await SalesProducts
    .findAll({ where: { saleId }, attributes: ['productId'] }))]
    .map(({ dataValues }) => dataValues.productId);
  const products = await Promise.all(saleProductsIds.map((id) => Products.findByPk(id)));
  return products;
}

async function getAllOrders(email) {
  const { id: userId } = await Users.findOne({ where: { email } });
  const orders = (await Sales.findAll({ where: { userId },
    attributes: ['id', 'status', 'saleDate', 'totalPrice'] }))
      .map(({ dataValues }) => dataValues);
  const result = await Promise.all(orders.map(async (curr) => {
    const FullData = curr;
    FullData.totalPrice = Number(FullData.totalPrice);
    FullData.products = await getProducts(curr.id);
    return FullData;
  }));
  return { orders: result };
}

module.exports = {
  getAOrder,
  getAllOrders,
};
