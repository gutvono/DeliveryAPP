const service = require('../services/carts.service');

async function getUserCartData(req, res) {
    const userCartData = await service.getUserCart();
    return req.status(200).json(userCartData);
}

async function insertOrUpdateItemCart(req, res) {
    const response = await service.insertOrUpdateItemCart(req.body)
    res.status(200).json(response)
}

module.exports = {
    getUserCartData,
    insertOrUpdateItemCart
};