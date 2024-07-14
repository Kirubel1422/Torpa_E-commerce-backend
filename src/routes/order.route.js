const {
  getAllOrders,
  getOrderById,
} = require("../controllers/order.controller");

const router = require("express").Router();

router.route("/getAllOrders").get(getAllOrders);
router.route("/getOrderById/:orderId").get(getOrderById);

module.exports = router;
