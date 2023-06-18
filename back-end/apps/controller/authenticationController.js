var express = require("express");
var router = express.Router();
var user_md = require("../models/user");
var jwt = require("jsonwebtoken");

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
    console.log(result);
    if (!result) {
        res.json({ message: "Success!" });
    } else {
        res.json({ message: "Sign up fail!" });
    }
});

router.post("/login", function (req, res) {
    var user = req.body;

    user = {
        email: user.email,
        password: user.password
    }

    user_md.checkUser(user)
    .then((result) => {
        // create and send token
        var token = user_md.createToken(result);
        res.status(200).json({ success: true, token});
    })
    .catch((error) => {
        res.status(401).json({ success: false, message: error });
    });
})

router.post("/verify", function(req, res){
     var token = req.body.token;
    //  console.log(token);
     user_md.verifyToken(token)
        .then((result) => {
            console.log("Xac thuc thanh cong");
            console.log(result);
        })
        .catch((error) => {
            console.log(error);

        })
})

module.exports = router;