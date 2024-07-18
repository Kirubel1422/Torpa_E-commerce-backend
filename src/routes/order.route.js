const {
  getAllOrders,
  getOrderById,
  getPaidOrders,
} = require("../controllers/order.controller");
const { authorizeSeller } = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router.route("/getAllOrders").get(authorizeSeller, getAllOrders);
router.route("/getOrderById/:orderId").get(getOrderById);
router.route("/getPaidOrders").get(authorizeSeller, getPaidOrders);

module.exports = router;
