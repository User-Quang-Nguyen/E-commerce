var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
var tokenModel = require("../models/token")
var inputTest = require("../utils/inputTest");

router.post("/signup", function (req, res) {
    var user = req.body;
    user = {
        "email": user.email,
        "first_name": user.firstName,
        "last_name": user.lastName
    }

    if (!inputTest.inputGmailTest(user.email) || !inputTest.inputTextTest(user.first_name, 30) || !inputTest.inputTextTest(user.last_name, 20)) {
        res.status(400).json({ message: "Wrong input character!" });
    } else {
        var result = userModel.registerUser(user);
        if (!result) {
            res.status(200).json({ message: "Sign up success!" });
        } else {
            res.status(400).json({ message: "Sign up fail!" });
        }
    }
});

router.post("/login", async function (req, res) {
    var user = req.body;

    user = {
        email: user.email,
        password: user.password
    }
    try {
        var result = await userModel.loginUser(user)
        if (result === "Đăng nhập thất bại") {
            res.status(401).json({ success: false, message: error });
        } else {
            var token = tokenModel.createToken(result);
            var data = {
                "id": result.id,
                "token": token
            }
            res.status(200).json({ success: true, data });
        }
    }
    catch (error) {
        console.log("Error");
        res.status(401).json({ success: false, message: error });
    }
})

router.post("/loginVerification", async function (req, res) {
    try {
        var token = req.body.token;
        var result = await tokenModel.loginVerification(token);
        if (result === "Invalid token") {
            res.setHeader('Content-Type', 'text/html');
            res.status(400).json({ message: false });
        } else {
            res.status(200).json({ message: true, result });
        }
    } catch (error) {
        res.status(400).json({ message: false })
    }
});

module.exports = router;