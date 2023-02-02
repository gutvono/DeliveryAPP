const { Router } = require('express');
const { validateSalesFields, validateStatusSale, tokenValidation } = require('../middlewares');
const { registerNewSale, updateSaleStatus } = require('../controllers/sale.controller');

const router = Router();

router.post('/sales', validateSalesFields, registerNewSale);

router.put('/sales/:id', validateStatusSale, tokenValidation, updateSaleStatus);

module.exports = router;
