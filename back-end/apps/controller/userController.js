var express = require("express");
var router = express.Router();
var user_md = require('../models/user')

router.get("/:userId", function (req, res) {
    var id = req.params.userId;
    user_md.getUserById(req, res, id);
})

module.exports = router;