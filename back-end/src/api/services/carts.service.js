const { Carts } = require('../../database/models');

async function getUserCart(id) {
    const userCart = Carts.findAll({
        where: { userId: id },
    })
    return userCart;
}

async function insertOrUpdateItemCart(item) {
    try {
        // verify if item already exists
        const [existingCartItem, createdCartItem] = await Carts.findOrCreate({
            where: {
                userId: item.userId,
                productId: item.productId
            },
            defaults: {
                quantity: item.quantity
            }
        })

        if (!createdCartItem) {
            // item already exists
            existingCartItem.quantity += item.quantity;
            await existingCartItem.save();
            console.log('Item atualizado no carrinho:', existingCartItem);
        } else {
            // item doesn't exist
            console.log('Item adicionado ao carrinho:', existingCartItem);
        }

    } catch (error) {
        console.error("Erro ao adicionar/atualizar item no carrinho:", error)
    }
}

module.exports = {
    getUserCart,
    insertOrUpdateItemCart,
};