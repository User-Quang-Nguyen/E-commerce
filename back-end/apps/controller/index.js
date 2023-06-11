var express = require("express");
var router = express.Router();

router.use("/admin", require(__dirname + "/admin.js"));
router.use("/blog", require(__dirname + "/blog.js"));
router.use("/data", require(__dirname + "/data.js"));

module.exports = router;