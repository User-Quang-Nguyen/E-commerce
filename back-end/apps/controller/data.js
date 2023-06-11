var express = require("express");
// var bodyParser = require('body-parser')
var router = express.Router();
var data_md = require('../models/product');
const { json } = require("body-parser");

router.get("/getpriority", function (req, res) {
    data_md.getDataPriority()
        .then((data) => {
            // data = JSON.parse(data);
            res.json(data);
        })
        .catch((error) => {
            res.status(401).json({ success: false, message: error });
        })
});

router.get("/getrandom", function(req, res){
    data_md.getRandom()
        .then((data) => {
            data = JSON.parse(data);
            res.send(data);
        })
        .catch((error) => {
            res.status(401).json({ success: false, message: error });
        })
})

module.exports = router;