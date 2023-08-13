var data_md = require('../service/dataProcess')
var math_md = require('../service/math')
var product_md = require('../models/product')

async function getCartById(req, res, id) {
    try {
        var getCartByIdQuery = `Select id, product_id, quantity from cart where user_id = ` + id;
        const data = await data_md.getData(getCartByIdQuery);

        var productDetail = [];
        await Promise.all(data.map(async (item) => {
            var respo = await product_md.getInfoProduct(item, productDetail, data);
            if (respo == null || typeof respo == 'undefined') {
                return;
            } else {
                res.json(productDetail);
            }
        }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred." });
    }
}

async function getTotalMoney(id, res) {
    var getTotalMoney = "select cart.user_id, product.price, cart.quantity from cart inner join product on product.id = cart.product_id where cart.user_id = " + id;
    try {
        const total = await data_md.getData(getTotalMoney);
        var num = 0;
        total.map((item) => {
            num = num + math_md.mul(item.price, item.quantity);
        })
        res.status(200).json(num);
    } catch (error) {
        res.status(400).json({ "message": error });
    }
}

function insertCart(form, req, res) {
    try {
        var add = "INSERT INTO cart(user_id, product_id, quantity) VALUES (" + form.userId + "," + form.productId + "," + form.quantity + ")";
        data_md.responseData(add, req, res);
    } catch (e) {
        res.status(400).json("Error insert");
    }
}

function updateCart(form, req, res) {
    try {
        var update = "UPDATE cart SET quantity =" + form.quantity + " WHERE user_id=" + form.userId + " AND product_id=" + form.productId;
        data_md.responseData(update, req, res);
    } catch (e) {
        res.status(400).json("Error update");
    }
}

async function addToCart(form, req, res) {
    var existenceCheck = "select * from cart where user_id=" + form.userId + " and product_id=" + form.productId;
    try {
        var result = await data_md.getData(existenceCheck);
        if (result.length === 0) {
            insertCart(form, req, res);
        } else {
            updateCart(form, req, res);
        }
    } catch (error) {
        console.log(error);
    }
}

function updateQuantity(form, req, res) {
    try {
        var update = `update cart set quantity = ${form.quantity} WHERE id = ${form.cartItem}`;
        data_md.responseData(update, req, res);
    } catch (error) {
        res.status(401).json({ "message": error });
    }
}

async function deleteCart(userId, res) {
    try {
        var deleteCart = `Delete from cart where user_id = ` + userId;
        await data_md.getData(deleteCart);
        res.status(200).json("Success");
    } catch (e) {
        res.status(500).json("Delete failed");
    }
}

async function deleteItem(id, user_id, res){
    try{
        var deleteIt = `Delete from cart where id = ${id} and user_id = ${user_id}`;
        await data_md.getData(deleteIt);
        res.status(200).json("Success");
    }catch(e){
        res.status(500).json("Delete failed");
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