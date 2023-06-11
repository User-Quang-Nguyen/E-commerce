var express = require("express");
var router = express.Router();
var user_md = require("../models/user");

router.post("/signup", function (req, res) {
    var user = req.body;

    user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        gender: user.gender
    };

    // console.log(req.params);

    var result = user_md.addUser(user);
    console.log(result);
    if (!result) {
        // res.render("signup", {data: {error: "Error!"}});
        res.json({ message: "Success!" });
    } else {
        res.json({ message: "Dang ki that bai" });
    }
});

router.post("/login", function (req, res) {
    var user = req.body;

    user = {
        email: user.email,
        password: user.password
    }

    user_md.checkUser(user)
    .then((message) => {
        // Đăng nhập thành công
        res.status(200).json({ success: true, message: message });
    })
    .catch((error) => {
        // Đăng nhập thất bại
        res.status(401).json({ success: false, message: error });
    });
})

module.exports = router;