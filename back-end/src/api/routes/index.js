const { Router } = require('express');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const saleRoutes = require('./sale.routes');
const orderRoutes = require('./order.routes');
const sellerRoutes = require('./seller.route');

const routes = Router();

routes.get('/coffee', (_req, res) => res.status(418).end());

// Rotas referentes a manipulação de dados dos usuários
routes.use(userRoutes);

// Rotas referentes a manipulação de dados de produtos
routes.use(productRoutes);

// Rotas referentes a manipulação de dados de vendas
routes.use(saleRoutes);

// Rotas referentes a manipulação de dados de ordens
routes.use('/customer', orderRoutes);

// Rotas referentes a manipulação de dados de ordens pela perspectiva do vendedor
routes.use('/seller', sellerRoutes);

module.exports = routes;
