const Order = require("../models/order");
const Product = require("../models/product");
const logger = require("../utils/logger")("stripe controller");
const stripeSecret = process.env.STRIPE_TEST_KEY;
const stripe = require("stripe")(stripeSecret);

exports.createPayment = (req, res, next) => {
  const { products, userId } = req.body;

  const quantifiedProducts = {};

  // Set up quantity of each product
  products.forEach((prod) => {
    if (quantifiedProducts[prod] == null) {
      quantifiedProducts[prod] = 1;
    } else {
      quantifiedProducts[prod]++;
    }
  });

  // Make promises using the quanitfied products
  let total = 0;
  const promises = Object.keys(quantifiedProducts).map((proId) => {
    return Product.findById(proId)
      .then((prod) => {
        return {
          productName: prod.productName,
          price: prod.price,
          prodId: prod._id,
          quantity: quantifiedProducts[proId],
        };
      })
      .catch((err) => {
        logger.error(err);
        next(err);
      });
  });

  let finalProducts = [];

  Promise.all(promises)
    .then((products) => {
      finalProducts = [...products];
      total = finalProducts.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
    })
    .then(() => {
      const newOrder = new Order({ products, total, user: userId });

      newOrder
        .save()
        .then((order) => {
          stripe.checkout.sessions
            .create({
              line_items: finalProducts.map((product) => ({
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
              console.log("session created successfully");
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
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      const orderId = checkoutSessionCompleted.metadata.orderId;
      Order.findByIdAndUpdate(orderId, { status: "Paid" }, { new: true })
        .then((updated) => {
          console.log("Order is updated successfully", updated);
        })
        .catch((err) => {
          logger.error(err);
          next(err);
        });
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};
