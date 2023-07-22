var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var data_md = require('../models/mysql');

router.get("/:userId/address", function (req, res) {
    var id = req.params.userId;
    var query = `Select id, first_name, last_name, address, city from users where id =` + id;
    data_md.responseData(query, req, res);
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
            res.status(200).json(newData);
        })
        .catch((error) => {
            res.status(401).json({ success: false, message: error });
        })
})

router.get("/:userId", function (req, res) {
    var id = req.params.userId;
    var getUserById = `Select id, first_name, last_name, date_of_birth, phone_number, city, address, gender from users where id = ${id}`;
    data_md.responseData(getUserById, req, res);
})

module.exports = router;