var express = require("express");
var router = express.Router();

router.use("/authentication", require(__dirname + "/authenticationController.js"));
router.use("/products", require(__dirname + "/productController.js"));
router.use("/users", require(__dirname + "/getUserInfo.js"));
router.use("/users", require(__dirname + "/cartController.js"));

module.exports = router;