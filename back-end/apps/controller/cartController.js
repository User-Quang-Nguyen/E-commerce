var express = require("express");
var router = express.Router();
var getData = require('./responseData')
var data_md = require('../models/product')

router.get("/", function (req, res) {
    var id = req.query.id;
    console.log(id);
    var getCartById = `Select id, product_id, quantity from cart where user_id =` + id;

    data_md.getData(getCartById)
        .then((data) => {
            var productDetail = [];
            data.map((item) => {
                var addData = [{
                    id: item.id,
                    quantity: item.quantity,
                }]

                var getProductById =
                    `SELECT 
                MIN(image.image) AS image, 
                product.name, 
                product.price, 
                Category.category_name
            FROM 
                product
            INNER JOIN 
                image ON image.product_id = product.id
            INNER JOIN 
                product_category ON product_category.product_id = product.id
            INNER JOIN 
                Category ON Category.id = product_category.category_id
            WHERE 
            	product.id = ` + item.product_id + `
            GROUP BY 
                product.id;`;
                data_md.getData(getProductById)
                    .then((product) => {
                        var productData = {
                            id: item.id,
                            image: product[0].image,
                            name: product[0].name,
                            price: product[0].price,
                            category_name: product[0].category_name,
                            quantity: item.quantity
                        };
                        productDetail.push(productData);
                        if (productDetail.length === data.length) {
                            res.json(productDetail);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        })
        .catch((error) => {
            console.log(error);
        })
})

module.exports = router;