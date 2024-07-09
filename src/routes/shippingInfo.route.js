const {
  getShippingInfoById,
  getAllShippingInfos,
  updateShippingInfo,
  deleteShippingInfo,
  createShippingInfo,
} = require("../controllers/shippingInfo.controller");
const shippingInfoMiddleware = require("../middlewares/shippingInfo.middleware");

const router = require("express").Router();

router
  .route("/createShippingInfo/")
  .post(shippingInfoMiddleware, createShippingInfo);
router.route("/getShippingInfoById/:shippingInfoId").get(getShippingInfoById);
router.route("/getAllShippingInfos").get(getAllShippingInfos);
router
  .route("/updateShippingInfo/:shippingInfoId")
  .put(shippingInfoMiddleware, updateShippingInfo);
router.route("/deleteShippingInfo/:shippingInfoId").delete(deleteShippingInfo);

module.exports = router;
