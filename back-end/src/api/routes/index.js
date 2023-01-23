const { Router } = require('express');

const routes = Router();

routes.get('/coffee', (_req, res) => res.status(418).end());

module.exports = routes;
