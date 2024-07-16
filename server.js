require("dotenv").config();
require("./src/configs/passport")();
require("./src/configs/db");
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const path = require("path");
const router = require("./src/routes/");
const errorHandler = require("./src/middlewares/errorHandler");
const { webhook } = require("./src/controllers/stripe.controller");

// Use cors
app.use(
  cors({
    origin: "*",
  })
);

// Handle Pre-flight requests
app.options("*", cors());

// Use helmet
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./public/")));
app.use(
  fileUpload({
    abortOnLimit: true,
    limits: { fileSize: 5000 * 1000 }, // 5mb
  })
);

// Use passport
passport.initialize();

// Use routers
app.use(router);

app.post(
  "/stripe/payment/webhook",
  express.json({ type: "application/json" }),
  webhook
);

// Error handling `404` - not found
app.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;

  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on: ${PORT}`));
