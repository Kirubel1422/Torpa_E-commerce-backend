const router = require("express").Router();
const { createPayment, webhook } = require("../controllers/stripe.controller");
const {
  authorizeCustomer,
} = require("../middlewares/authorization.middleware");

router.route("/createPayment").post(authorizeCustomer, createPayment);

module.exports = router;
