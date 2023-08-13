var express = require("express");
var router = express.Router();
var cart_md = require('../models/cart')
var order_md = require('../models/order')

router.get("/:userId/cart", function (req, res) {
    var id = req.params.userId;
    cart_md.getCartById(req, res, id);
})

router.get("/:userId/cart/total", async function (req, res) {
    var id = req.params.userId;
    cart_md.getTotalMoney(id, res);
})

router.post("/cart", async function (req, res) {
    var form = req.body;
    form = {
        userId: form.userId,
        productId: form.productId,
        quantity: form.quantity,
    }
    cart_md.addToCart(form, req, res);
})

router.put("/cartitems", async function (req, res) {
    var form = req.body;
    form = {
        cartItem: form.id,
        quantity: form.quantity,
    }
    cart_md.updateQuantity(form, req, res);
})

router.post("/:userId/cart/order", async function (req, res) {
    const userId = req.params.userId;
    await order_md.insertOrder(userId);
    await cart_md.deleteCart(userId, res);
})

router.delete("/:userId/cart", async function (req, res) {
    const userId = req.params.userId;
    await cart_md.deleteCart(userId, res);
})

router.get("/:userId/cart/order", function (req, res) {
    const userId = req.params.userId;
    order_md.getOrderInfo(userId, req, res);
})

router.delete("/:userId/cart/items/:id", function(req, res){
    const userId = req.params.userId;
    const itemId = req.params.id;
    cart_md.deleteItem(itemId, userId, res);
})

module.exports = router;