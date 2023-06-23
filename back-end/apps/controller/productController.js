var express = require("express");
var router = express.Router();
var data_md = require('../models/product');

function responseData(query, req, res) {
    data_md.getData(query)
        .then((data) => {
            res.json(data);
            // console.log(data);
        })
        .catch((error) => {
            res.status(401).json({ success: false, message: error });
        })
}

router.get("/popular", function (req, res) {
    var getPriorityProducts = `select * from product_category 
                            inner join product on product_category.product_id = product.id
                            inner join category on product_category.category_id = category.id 
                            inner join image on product_category.product_id = image.product_id
                            where category_name = "Nổi bật" LIMIT 1;`;
    responseData(getPriorityProducts, req, res);
});

router.get("/normal", function (req, res) {
    var getRandomProducts = `select * from product_category 
                            inner join product on product_category.product_id = product.id
                            inner join category on product_category.category_id = category.id 
                            inner join image on product_category.product_id = image.product_id
                            where category_name = "Thông dụng" LIMIT 1;`;
    responseData(getRandomProducts, req, res);
})

router.get("/category", function (req, res) {
    var getCategories = `Select id, category_name from category where category_type = 1`;
    responseData(getCategories, req, res);
});

module.exports = router;