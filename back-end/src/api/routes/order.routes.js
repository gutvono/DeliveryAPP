const { Router } = require('express');
const { getAOrder } = require('../controllers/order.controller');

const router = Router();

router.get('/orders/:id', getAOrder);

module.exports = router;
