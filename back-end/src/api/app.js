const express = require('express');
const cors = require('cors');

const allRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(allRoutes);

module.exports = app;
