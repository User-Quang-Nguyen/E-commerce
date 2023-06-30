var express = require("express");
var router = express.Router();

router.use("/authentication", require(__dirname + "/authenticationController.js"));
router.use("/product", require(__dirname + "/productController.js"));
router.use("/user", require(__dirname + "/getUserInfo.js" ));
module.exports = router;