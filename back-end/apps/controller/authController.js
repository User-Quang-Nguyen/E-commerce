var express = require("express");
var router = express.Router();
var user_md = require("../models/user");
var token_md = require("../models/token")

router.post("/signup", function (req, res) {
    var user = req.body;

    user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        gender: user.gender
    };

    var result = user_md.addUser(user);
    if (!result) {
        res.json({ message: "Sign up success!" });
    } else {
        res.json({ message: "Sign up fail!" });
    }
});

router.post("/login", async function (req, res) {
    var user = req.body;

    user = {
        email: user.email,
        password: user.password
    }
    try {
        var result = await user_md.checkUser(user)
        if (result === "Đăng nhập thất bại") {
            res.status(401).json({ success: false, message: error });
        } else {
            var token = token_md.createToken(result);
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
        var result = await token_md.loginVerification(token);
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