const Order = require("../models/order");
const logger = require("../utils/logger")("Order controller");

exports.getAllOrders = (req, res, next) => {
  Order.find({})
    .populate("products")
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getOrderById = (req, res, next) => {
  const { orderId } = req.params;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return res.status(400).json({
          message: "Order not found.",
        });
      }

      res.send(order);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getPaidOrders = (req, res, next) => {
  Order.find({ status: { $in: ["paid", "Paid"] } })
    .then((order) => {
      res.send(order);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
