require("dotenv").config();
require("./src/configs/passport")();
require("./src/configs/db");
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const router = require("./src/routes/");
const errorHandler = require("./src/middlewares/errorHandler");

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

// Use passport
passport.initialize();

// Use routers
app.use(router);

// Error handling `404` - not found
app.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;

  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on: ${PORT}`));
