var express = require("express");
var router = express.Router();
var product_md = require('../models/product')

router.get("/popular", function (req, res) {
    product_md.getPriorityProducts(req, res);
});

router.get("/normal", function (req, res) {
    product_md.getNormalProducts(req, res);
})

router.get("/category", function (req, res) {
    product_md.getCategories(req, res);
});

router.get("/:productId", function (req, res) {
    var id = req.params.productId;
    product_md.getProductById(req, res, id);
})

router.get("/:productId/image", function (req, res) {
    var id = req.params.productId;
    product_md.getImageOfPro(req, res, id);
})

module.exports = router;