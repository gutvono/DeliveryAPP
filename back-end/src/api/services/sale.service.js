const moment = require('moment');
const { Products, Sales, SalesProducts, Users } = require('../../database/models');
const { decodeToken } = require('../utils/jwt');

async function validateProducts(products) {
  const validId = (await Products.findAll({ attributes: ['id'] })).map(({ id }) => id);
  const verifyId = products.every(({ id }) => validId.includes(id));

  if (!verifyId) {
    return { error: { status: 400, message: 'One or more products have invalid ids' } };
  }

  const productsDB = await Products.findAll({ attributes: ['id', 'price'] });
  let totalPrice = 0;
  products.forEach(({ id, qtd }) => {
    const selectedProduct = productsDB.find((p) => Number(p.id) === Number(id));
    totalPrice += Number(selectedProduct.price) * Number(qtd);
  });
  return { totalPrice };
}

async function validateSeller(id) {
  const seller = await Users.findOne({ where: { id, role: 'seller' } });
  if (!seller) {
    return { error: { status: 400, message: 'Invalid seller' } };
  }
  return { sellerId: seller.id };
}

async function validateUserToken(token) {
  const email = decodeToken(token);
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return { error: { status: 400, message: 'Invalid token' } };
  }

  return { userId: user.id };
}

async function registerNewSale({ products, details }, token) {
  let saleToCreate = {
    deliveryAddress: details.address,
    deliveryNumber: details.number,
    status: 'Pendente',
    saleDate: moment().utcOffset(-180).format('YYYY-MM-DD HH:mm:ss'),
  };
  const validations = await Promise.all([
    validateProducts(products), validateUserToken(token), validateSeller(details.sellerId),
  ]);
  const error = validations.find((curr) => curr && curr.error);
  if (error) return error;
  validations.forEach((obj) => { saleToCreate = Object.assign(saleToCreate, obj); });
  const { id: saleId } = await Sales.create(saleToCreate);
  await Promise.all(products.map(async ({ id, qtd }) => {
    await SalesProducts.create({ saleId, productId: id, quantity: qtd });
  }));
  return { success: { saleId } };
}

async function updateSaleStatus(id, email, status) {
  const user = await Users.findOne({ where: { email } });
  const sale = await Sales.findOne({ where: { id, sellerId: user.id } });
  if (!sale) {
    return { error: { status: 400, message: 'Sale not found' } };
  }
  await Sales.update({ status }, {
    where: { id },
  });
  const updatedSale = await Sales.findOne({ where: { id, status } });
  if (updatedSale !== sale) return { message: 'Successfully updated' };
  return { error: { status: 500, message: 'Update failed' } };
}

module.exports = {
  registerNewSale,
  updateSaleStatus,
};
