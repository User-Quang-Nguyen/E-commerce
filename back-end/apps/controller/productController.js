var express = require("express");
var router = express.Router();
var data_md = require('../models/product');
var getData = require('./responseData');

router.get("/popular", function (req, res) {
    var getPriorityProducts = `select * from product_category 
                            inner join product on product_category.product_id = product.id
                            inner join category on product_category.category_id = category.id 
                            inner join image on product_category.product_id = image.product_id
                            where category_name = "Nổi bật"
                            group by product.id;`;
    getData.responseData(getPriorityProducts, req, res);
});

router.get("/normal", function (req, res) {
    var getRandomProducts = `select * from product_category 
                            inner join product on product_category.product_id = product.id
                            inner join category on product_category.category_id = category.id 
                            inner join image on product_category.product_id = image.product_id
                            where category_name = "Thông dụng"
                            group by product.id;`;
    getData.responseData(getRandomProducts, req, res);
})

router.get("/category", function (req, res) {
    var getCategories = `Select id, category_name from category where category_type = 1`;
    getData.responseData(getCategories, req, res);
});

router.get("/productdetail", function (req, res) {
    var id = req.query.id;
    var getProductDetail = `Select * from product where id = ` + id;
    getData.responseData(getProductDetail, req, res);
})

router.get("/productdetail/image", function (req, res) {
    var id = req.query.id;
    var getImage = `select * from image where product_id = ` + id;
    getData.responseData(getImage, req, res);
})

module.exports = router;