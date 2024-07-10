const {
  getShippingInfoById,
  getAllShippingInfos,
  updateShippingInfo,
  deleteShippingInfo,
  createShippingInfo,
} = require("../controllers/shippingInfo.controller");
const shippingInfoMiddleware = require("../middlewares/shippingInfo.middleware");
const { authorizeSeller } = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router
  .route("/createShippingInfo/")
  .post(authorizeSeller, shippingInfoMiddleware, createShippingInfo);
router.route("/getShippingInfoById/:shippingInfoId").get(getShippingInfoById);
router.route("/getAllShippingInfos").get(getAllShippingInfos);
router
  .route("/updateShippingInfo/:shippingInfoId")
  .put(authorizeSeller, shippingInfoMiddleware, updateShippingInfo);
router
  .route("/deleteShippingInfo/:shippingInfoId")
  .delete(authorizeSeller, deleteShippingInfo);

module.exports = router;
