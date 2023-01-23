const express = require('express');
const allRoutes = require('./routes');

const app = express();

app.use(express.json());

app.use(allRoutes);

module.exports = app;
