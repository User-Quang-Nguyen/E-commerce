var express = require("express");
var router = express.Router();
var productModel = require('../models/product');

router.get("/popular", async function (req, res) {
    try {
        let result = await productModel.getProductByCategory("Nổi bật");
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/normal", async function (req, res) {
    try {
        let result = await productModel.getProductByCategory("Thông dụng");
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.get("/:productId", async function (req, res) {
    try {
        var id = req.params.productId;
        let result = await productModel.getProductById(id);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
})

router.get("/:productId/image", async function (req, res) {
    try {
        var id = req.params.productId;
        let result = await productModel.getProductImage(id);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
})

module.exports = router;