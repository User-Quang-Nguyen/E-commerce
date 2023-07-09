var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var getData = require("./responseData")
var data_md = require('../models/product');

router.get("/:userId/address", function (req, res) {
    var id = req.params.userId;
    var query = `Select id, first_name, last_name, address, city from users where id =` + id;
    getData.responseData(query, req, res);
})

router.get("/:userId/delivery", function (req, res) {
    var id = req.params.userId;
    var query = `select first_name, last_name, phone_number, city, address from users where id = ` + id;
    data_md.getData(query)
        .then((data) => {
            var newName = data[0].first_name + ' ' + data[0].last_name;
            var newAddress = data[0].address + ', ' + data[0].city;
            var newData = {
                fullName: newName,
                phoneNumber: data[0].phone_number,
                address: newAddress,
            }
            res.json(newData);
        })
        .catch((error) => {
            res.status(401).json({ success: false, message: error });
        })
})


module.exports = router;