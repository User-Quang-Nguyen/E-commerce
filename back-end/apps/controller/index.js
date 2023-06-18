var express = require("express");
var router = express.Router();

router.use("/authentication", require(__dirname + "/authenticationController.js"));
router.use("/product", require(__dirname + "/productController.js"));

module.exports = router;