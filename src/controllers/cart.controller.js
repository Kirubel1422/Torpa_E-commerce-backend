const Cart = require("../models/cart");
const logger = require("../utils/logger")("Cart Controller");

exports.getAllCartItems = (req, res, next) => {
  Cart.find({})
    .then((cartItems) => {
      res.send(cartItems);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getCartByUserId = (req, res, next) => {
  const { userId } = req.body;

  Cart.find({ userId })
    .populate("product")
    .then((cart) => {
      res.send(cart);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createCartItem = (req, res, next) => {
  const { userId, product } = req.body;

  const newCartItem = new Cart({
    userId,
    product,
  });

  newCartItem
    .save()
    .then((cart) => {
      if (!cart) {
        return res.status(400).json({ message: "Failed to add item to cart" });
      }
      res.status(201).json({ message: "Item added to cart." });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.removeCartItem = (req, res, next) => {
  const { cartItemId } = req.params;

  Cart.findByIdAndDelete(cartItemId).then((item) => {
    if (!item) {
      return res
        .status(400)
        .json({ message: "Failed to remove item from cart" });
    }

    res.json({ message: "Cart Item Removed." });
  });
};

exports.removeAllCartItems = (req, res, next) => {
  const { userId } = req.body;

  Cart.deleteMany({ userId }).then((items) => {
    if (!items) {
      return res
        .status(400)
        .json({ message: "Failed to remove items from cart" });
    }

    res.json({ message: "All items removed from cart." });
  });
};
