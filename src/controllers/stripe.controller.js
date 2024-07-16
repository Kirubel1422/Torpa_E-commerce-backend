const Order = require("../models/order");
const logger = require("../utils/logger")("stripe controller");
const stripeSecret = process.env.STRIPE_TEST_KEY;
const stripe = require("stripe")(stripeSecret);

exports.createPayment = (req, res, next) => {
  const { products, total, userId } = req.body;

  const newOrder = new Order({ products, total, user: userId });

  newOrder
    .save()
    .then((order) => {
      stripe.checkout.sessions
        .create({
          line_items: products.map((product) => ({
            price_data: {
              unit_amount: product.price * 100,
              currency: "usd",
              product_data: {
                name: product.productName,
              },
            },
            quantity: product.quantity,
          })),
          success_url: "http://localhost:3000/",
          cancel_url: "http://localhost:3000/",
          mode: "payment",
          metadata: {
            orderId: order._id.toString(),
          },
        })
        .then((session) => {
          console.log("session created:", session);
          res.send({ sessionUrl: session.url, order });
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
  const event = req.body;
  // Handle the event
  switch (event.type) {
    case "charge.failed":
      const chargeFailed = event.data.object;
      // Then define and call a function to handle the event charge.failed
      break;
    case "charge.pending":
      const chargePending = event.data.object;
      // Then define and call a function to handle the event charge.pending
      break;
    case "charge.succeeded":
      const chargeSucceeded = event.data.object;
      // Then define and call a function to handle the event charge.succeeded
      console.log(chargeSucceeded.metadata);
      const orderId = chargeSucceeded.metadata.orderId;
      Order.findByIdAndUpdate(orderId, { status: "Paid" });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};
