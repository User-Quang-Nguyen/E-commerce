var express = require("express");
var router = express.Router();
var data_md = require('../models/product');

function responseData(query, req, res){
    data_md.getProducts(query)
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(401).json({ success: false, message: error });
    })
}

router.get("/popular", function (req, res) {
    var getPriorityProducts = `Select id, name, price, image from product where priority = 1`;
    responseData(getPriorityProducts, req, res);
});

router.get("/normal", function (req, res) {
    var getRandomProducts = `Select id, name, price, image from product where priority = 3`;
    responseData(getRandomProducts, req, res);
})

router.get("/category", function(req, res){
    var getCategories = `Select * from category;`;
    responseData(getCategories, req, res);
});

module.exports = router;