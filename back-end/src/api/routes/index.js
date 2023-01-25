const { Router } = require('express');
const userRoutes = require('./user.routes');

const routes = Router();

routes.get('/coffee', (_req, res) => res.status(418).end());

// Rotas referentes a manipulação de dados dos usuários
routes.use(userRoutes);

module.exports = routes;
