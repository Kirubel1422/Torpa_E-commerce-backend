const {
  getAllCartItems,
  getCartByUserId,
  createCartItem,
  removeCartItem,
  removeAllCartItems,
} = require("../controllers/cart.controller");
const {
  authorizeSeller,
  authorizeCustomer,
} = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router.route("/getAllCartItems").get(authorizeSeller, getAllCartItems);
router.route("/getCartByUserId/").get(authorizeCustomer, getCartByUserId);
router.route("/createCartItem").post(authorizeCustomer, createCartItem);
router
  .route("/removeCartItem/:cartItemId")
  .delete(authorizeCustomer, removeCartItem);
router
  .route("/removeAllCartItems")
  .delete(authorizeCustomer, removeAllCartItems);

module.exports = router;
