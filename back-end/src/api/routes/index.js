const { Router } = require('express');
const loginRoutes = require('./login.routes');

const routes = Router();

routes.get('/coffee', (_req, res) => res.status(418).end());

routes.use('/login', loginRoutes);

module.exports = routes;
