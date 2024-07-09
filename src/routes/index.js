const router = require("express").Router();

router.use("/api/v1/auth/", require("./auth.route"));
router.use("/api/v1/size/", require("./size.route"));
router.use("/api/v1/brand/", require("./brand.route"));
router.use("/api/v1/category/", require("./category.route"));
router.use("/api/v1/color/", require("./color.route"));
router.use("/api/v1/shippingInfo/", require("./shippingInfo.route"));
router.use("/api/v1/reviews/", require("./reviews.route"));

module.exports = router;
