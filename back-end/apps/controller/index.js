var express = require("express");
var router = express.Router();

router.use("/authentication", require(__dirname + "/authenticationController.js"));
router.use("/product", require(__dirname + "/productController.js"));
router.use("/user", require(__dirname + "/getUserInfo.js"));
router.use("/cart", require(__dirname + "/cartController.js"));

module.exports = router;