const { Router } = require('express');
const { getAOrder, getAllOrders } = require('../controllers/order.controller');
const { getTheUser } = require('../middlewares');

const router = Router();

router.get('/orders', getTheUser, getAllOrders);
router.get('/orders/:id', getTheUser, getAOrder);

module.exports = router;
