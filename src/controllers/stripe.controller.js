const Order = require("../models/order");
const logger = require("../utils/logger")("stripe controller");
const stripeSecret = process.env.STRIPE_TEST_KEY;
const stripe = require("stripe")(stripeSecret);

exports.createPayment = (req, res, next) => {
  const { products, total, userId } = req.body;

  stripe.paymentIntents
    .create({
      amount: total,
      payment_method_types: ["card"],
      currency: "USD",
      metadata: {
        products: JSON.stringify(products),
      },
    })
    .then((paymentIntent) => {
      const newOrder = new Order({ products, total, user: userId });
      newOrder
        .save()
        .then((savedOrder) => {
          console.log(savedOrder);
          res.send(paymentIntent);
        })
        .catch((err) => {
          logger.error(err);
          next(err);
        });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.webhook = (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  stripe.webhook
    .constructEvent(req.body, sig, stripeSecret)
    .then((event) => {
      // Handle the event
      switch (event.type) {
        case "charge.succeeded":
          // Then define and call a function to handle the event charge.succeeded
          const chargeSucceeded = event.data.object;
          console.log("ChargeSucceded: ", chargeSucceeded);
          return res.send({ message: "Thanks for buying!" });
        case "checkout.session.async_payment_failed":
          // Then define and call a function to handle the event checkout.session.async_payment_failed
          const checkoutSessionAsyncPaymentFailed = event.data.object;
          console.log(
            "CheckoutSessionAsyncPaymentFailed: ",
            checkoutSessionAsyncPaymentFailed
          );
          return res
            .status(400)
            .json({ message: "Checkout Session payment failed." });
        case "checkout.session.async_payment_succeeded":
          const checkoutSessionAsyncPaymentSucceeded = event.data.object;
          // Then define and call a function to handle the event checkout.session.async_payment_succeeded
          console.log(
            "CheckoutSessionAsyncPaymentSucceeded: ",
            checkoutSessionAsyncPaymentSucceeded
          );
          return res
            .status(400)
            .json({ message: "CheckoutSessionAsyncPaymentSucceeded." });
        case "checkout.session.completed":
          const checkoutSessionCompleted = event.data.object;
          // Then define and call a function to handle the event checkout.session.completed
          console.log("CheckoutSessionCompleted: ", checkoutSessionCompleted);
          return res.status(400).json({ message: "CheckoutSessionCompleted." });
        case "checkout.session.expired":
          const checkoutSessionExpired = event.data.object;
          // Then define and call a function to handle the event checkout.session.expired
          console.log("CheckoutSessionExpired: ", checkoutSessionExpired);
          return res.status(400).json({ message: "CheckoutSessionExpired." });
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
