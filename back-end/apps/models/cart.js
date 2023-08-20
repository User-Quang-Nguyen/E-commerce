var queryProcess = require('../utils/queryProcess')
var productModel = require('../models/product')

async function getCartById(id) {
    try {
        var getCartById = `Select id, product_id, quantity from cart where user_id = ${id}`;
        const data = await queryProcess.executeQuery(getCartById);

        var productDetail = [];
        await Promise.all(data.map(async (item) => {
            let product = await productModel.getInfoProduct(item);
            var productData = {
                id: item.id,
                image: product.image,
                name: product.name,
                price: product.price,
                category_name: product.category_name,
                quantity: item.quantity,
            }
            productDetail.push(productData);
        }))
        return productDetail;
    } catch (error) {
        return error;
    }
}

async function getTotalMoney(id) {
    var getTotalMoney = `select cart.user_id, product.price, cart.quantity from cart inner join product on product.id = cart.product_id where cart.user_id = ${id}`;
    try {
        const total = await queryProcess.executeQuery(getTotalMoney);
        return total;
    } catch (error) {
        return error;
    }
}

function insertCart(form) {
    try {
        var add = `INSERT INTO cart(user_id, product_id, quantity) VALUES (${form.userId}, ${form.productId}, ${form.quantity})`;
        return queryProcess.executeQuery(add);
    } catch (e) {
        return e;
    }
}

function updateCart(form) {
    try {
        var update = `UPDATE cart SET quantity = ${form.quantity} WHERE user_id= ${form.userId} AND product_id= ${form.productId}`;
        return queryProcess.executeQuery(update);
    } catch (e) {
        return e;
    }
}

async function addToCart(form) {
    var existenceCheck = `select * from cart where user_id= ${form.userId} and product_id= ${form.productId}`;
    try {
        var result = await queryProcess.executeQuery(existenceCheck);
        if (result.length === 0) {
            var result = insertCart(form);
            return result;
        } else {
            var result = updateCart(form);
            return result;
        }
    } catch (error) {
        return error;
    }
}

function updateQuantity(form) {
    try {
        var update = `update cart set quantity = ${form.quantity} WHERE id = ${form.cartItem}`;
        return queryProcess.executeQuery(update);
    } catch (error) {
        return error;
    }
}

async function deleteCart(userId) {
    try {
        var deleteCart = `Delete from cart where user_id = ${userId}`;
        return queryProcess.executeQuery(deleteCart);
    } catch (e) {
        return e;
    }
}

async function deleteItem(id, user_id) {
    try {
        var deleteIt = `Delete from cart where id = ${id} and user_id = ${user_id}`;
        return queryProcess.executeQuery(deleteIt);
    } catch (e) {
        return e;
    }
}

module.exports = {
    getCartById: getCartById,
    getTotalMoney: getTotalMoney,
    addToCart: addToCart,
    updateQuantity: updateQuantity,
    deleteCart: deleteCart,
    deleteItem: deleteItem
}