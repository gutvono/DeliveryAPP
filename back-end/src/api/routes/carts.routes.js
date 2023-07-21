const { Router } = require('express');
const { getUserCartData } = require('../controllers/carts.controller');

const router = Router();

router.get('/carts', getUserCartData);

module.exports = router;