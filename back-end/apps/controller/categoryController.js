var express = require("express");
var router = express.Router();
var categoryModel = require('../models/category');

router.get("/categories", async function (req, res) {
    try {
        var result = await categoryModel.getCategories();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;