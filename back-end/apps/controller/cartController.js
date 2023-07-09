var express = require("express");
var router = express.Router();
var getData = require('./responseData')
var data_md = require('../models/product')
var math_md = require('../calculator/math');

router.get("/:userId/cart/infor", function (req, res) {
    var id = req.params.userId;
    var getCartById = `Select id, product_id, quantity from cart where user_id =` + id;

    data_md.getData(getCartById)
        .then((data) => {
            var productDetail = [];
            data.map((item) => {
                var addData = [{
                    id: item.id,
                    quantity: item.quantity,
                }]
                var getProductById = `SELECT MIN(image.image) AS image, product.name, product.price, Category.category_name FROM product INNER JOIN image ON image.product_id = product.id INNER JOIN product_category ON product_category.product_id = product.id INNER JOIN Category ON Category.id = product_category.category_id WHERE product.id = ` + item.product_id + ` GROUP BY product.id;`;
                data_md.getData(getProductById)
                    .then((product) => {
                        var total = math_md.mul(item.quantity, product[0].price);
                        var productData = {
                            id: item.id,
                            image: product[0].image,
                            name: product[0].name,
                            price: product[0].price,
                            category_name: product[0].category_name,
                            quantity: item.quantity,
                            total: total
                        };
                        productDetail.push(productData);
                        if (productDetail.length === data.length) {
                            res.json(productDetail);
                        }
                    })
                    .catch((error) => {
                        // console.log(error);
                        res.status(500).json({ message: false });
                    })
            })
        })
        .catch((error) => {
            console.log(error);
        })
})

router.get("/:userId/cart/total", function (req, res) {
    var id = req.params.userId;
    var getTotalMoney = "select cart.user_id, product.price, cart.quantity from cart inner join product on product.id = cart.product_id where cart.user_id = " + id;
    getData.responseData(getTotalMoney, req, res);
})

router.post("/cart/addtocart", async function (req, res) {
    var info = req.body;
    info = {
        userId: info.userId,
        productId: info.productId,
        quantity: info.quantity,
    }
    var existenceCheck = "select * from cart where user_id=" + info.userId + " and product_id=" + info.productId;
    try {
        var result = await data_md.getData(existenceCheck);
        if (result.length === 0) {
            var add = "INSERT INTO cart(user_id, product_id, quantity) VALUES (" + info.userId + "," + info.productId + "," + info.quantity + ")";
            var result1 = await getData.responseData(add, req, res);
        } else {
            var update = "UPDATE cart SET quantity =" + info.quantity + " WHERE user_id=" + info.userId + " AND product_id=" + info.productId;
            var result2 = await getData.responseData(update, req, res);
        }
    } catch (error) {
        console.log(error);
    }
})

router.post("/:userId/cart/order", async function (req, res) {
    const userId = req.params.userId;
    var query = `select cart.user_id, SUM(product.price*cart.quantity) AS total, current_timestamp() AS created_at
                from cart inner join product on cart.product_id = product.id where cart.user_id=` + userId + ` group by cart.user_id`;
    try {
        // get additional data for the order table
        var result = await data_md.getData(query);
        var total_money = result[0].total + result[0].total * 0.1;
        var time = result[0].created_at.toString();

        // add data to order table
        var insert = `Insert into orders(user_id, total_money, created_at) values(` + result[0].user_id + `,` + total_money + `,` + `"` + time + `"` + `)`;
        var result1 = await data_md.getData(insert);

        // get additional data for the list_order table
        var insertListOrder = `select orders.id as order_id, cart.product_id, cart.quantity, product.name, product.price
        from cart inner join orders on orders.user_id = cart.user_id
        inner join product on cart.product_id = product.id
        where orders.id =`+ result1.insertId;
        var result2 = await data_md.getData(insertListOrder);

        // add data to list_order table
        result2.map(async (item) => {
            var query = `Insert into list_orders(order_id, product_id, quantity, name, price)
                        values(`+ item.order_id + `,` + item.product_id + `,` + item.quantity + `,"` +
                item.name + `",` + item.price + `)`;
            var res = await data_md.getData(query);
        })

        res.status(200).json({ message: true });
    } catch (e) {
        res.status(400).json({ message: false });
    }
})

router.delete("/:userId/cart", async function (req, res) {
    const userId = req.params.userId;
    var deleteCart = `Delete from cart where user_id = ` + userId;
    try {
        var dl = await data_md.getData(deleteCart);
        res.status(200).json({ message: true });
    } catch (e) {
        res.status(400).json({ message: false });
    }
})

module.exports = router;