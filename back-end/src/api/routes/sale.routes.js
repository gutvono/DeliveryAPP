const { Router } = require('express');
const { validateSalesFields } = require('../middlewares');
const { registerNewSale } = require('../controllers/sale.controller');

const router = Router();

router.post('/sales', validateSalesFields, registerNewSale);

module.exports = router;
