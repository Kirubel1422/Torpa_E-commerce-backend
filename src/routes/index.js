const router = require("express").Router();

router.use("/api/v1/auth/", require("./auth.route"));
router.use("/api/v1/size/", require("./size.route"));

module.exports = router;
