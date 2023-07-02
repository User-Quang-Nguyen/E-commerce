var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var getData = require("./responseData")
var data_md = require('../models/product');

router.get("/information", function (req, res) {
    var id = req.query.id;
    var query = `Select id, first_name, last_name, address, city from users where id =` + id;
    getData.responseData(query, req, res);
})

router.get("/addressForCart", function (req, res) {
    var id = req.query.id;
    var query = `select first_name, last_name, phone_number, city, address from users where id = ` + id;
    data_md.getData(query)
        .then((data) => {
            console.log(data);
            var newName = data[0].first_name + ' ' + data[0].last_name;
            var newAddress = data[0].address + ', ' + data[0].city;
            var newData = {
                fullName: newName,
                phoneNumber: data[0].phone_number,
                address: newAddress,
            }
            console.log(newData);
            res.json(newData);
        })
        .catch((error) => {
            res.status(401).json({ success: false, message: error });
        })
})


module.exports = router;