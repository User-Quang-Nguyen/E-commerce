var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var getData = require("./responseData")

router.get("/information", function (req, res) {
    var id = req.query.id;
    var query = `Select id, first_name, last_name, address, city from users where id =` + id;
    getData.responseData(query, req, res);
})


module.exports = router;