var express = require("express");
var router = express.Router();
var cartModel = require('../models/cart');
var orderModel = require('../models/order');
var tax = require('../common/tax');
var authenModel = require('../models/token');

router.get("/:userId/cart", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        var id = authen.userID;
        var result = await cartModel.getCartById(id);
        var responseData = [];
        result.map((item) => {
            var money = item.quantity * item.price;
            var total = money + money * tax.VAT;
            Object.assign(item, {
                total: total
            });
            responseData.push(item);
        })
        res.status(200).json(responseData);
    } catch (e) {
        res.status(400).json(e);
    }
})

router.get("/:userId/cart/total", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        var id = authen.userID;
        var result = await cartModel.getTotalMoney(id);
        var num = 0;
        result.map((item) => {
            num = num + item.price * item.quantity;
        })
        res.status(200).json(num);
    } catch (e) {
        res.status(400).json({ "message": e });
    }
})

router.post("/cart", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        var form = req.body;
        var result = await cartModel.addToCart(form);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
})

router.put("/cartitems", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        var form = req.body;
        form = {
            cartItem: form.id,
            quantity: form.quantity,
        }
        var result = await cartModel.updateQuantity(form);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
})

router.post("/:userId/cart/order", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        const userId = authen.userID;
        var result = await orderModel.getOrderTableInfo(userId);
        var total_money = result[0].total + result[0].total * tax.VAT;
        var time = `"` + result[0].created_at + `"`;
        var data = {
            "user_id": result[0].user_id,
            "total_money": total_money,
            "created_at": time
        }
        var result_1 = await orderModel.insertOrderTable(data);
        var result_2 = await orderModel.getListOrderTableInfo(result_1.insertId, userId);
        result_2.map(async (item) => {
            await orderModel.insertListOrderTable(item);
        })
        await cartModel.deleteCart(userId);
        res.status(200).json("Success!");
    } catch (e) {
        res.status(400).json(e);
    }
})

router.delete("/:userId/cart", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        const userId = authen.userID;
        await cartModel.deleteCart(userId);
        res.status(200).json("Success!")
    } catch (e) {
        res.status(400).json(e);
    }
})

router.get("/:userId/cart/order", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        const userId = authen.userID;
        var result = await orderModel.getOrderInfo(userId, req, res);
        var data = [];
        result.map((item) => {
            newData = {
                key: item.k,
                total: item.total,
                created_at: item.created_at,
                secondLevel: Array.from(JSON.parse(item.secondLevel))
            }
            data.push(newData);
        })
        res.status(200).json(data);
    } catch (e) {
        res.status(400).json(e);
    }
})

router.delete("/:userId/cart/items/:id", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        const userId = authen.userID;
        const itemId = req.params.id;
        var result = await cartModel.deleteItem(itemId, userId);
        res.status(200).json("Success");
    } catch (e) {
        res.status(400).json(e);
    }
})

module.exports = router;