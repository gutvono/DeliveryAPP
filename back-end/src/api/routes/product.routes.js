const { Router } = require('express');
const { getAllProducts } = require('../controllers/product.controller');
const router = Router();

router.get('/products', getAllProducts)

module.exports = router;
