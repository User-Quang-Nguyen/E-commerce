var express = require("express");
var router = express.Router();
var userModel = require('../models/user');
var authenModel = require('../models/token');

router.get("/:userId", async function (req, res) {
    try {
        var authen = authenModel.authentication(req);
        var id = authen.userID;
        var result = await userModel.getUserById(id);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(e);
    }
})

module.exports = router;