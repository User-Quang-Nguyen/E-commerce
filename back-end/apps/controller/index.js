var express = require("express");
var router = express.Router();

router.use("/authentication", require(__dirname + "/authController.js"));
router.use("/products", require(__dirname + "/categoryController.js"));
router.use("/products", require(__dirname + "/productController.js"));
router.use("/users", require(__dirname + "/userController.js"));
router.use("/users", require(__dirname + "/cartController.js"));

module.exports = router;