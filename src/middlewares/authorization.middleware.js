const passport = require("passport");

exports.authorizeSeller = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json(info || { message: "UnAuthorized user." });

    // Check if it is a seller
    if (user.role != "Seller") {
      const error = new Error("Not a seller!");
      error.status = 401;

      return next(error);
    }

    // Attach authenticated user's id to req.body
    req.body.userId = user._id;

    next();
  })(req, res, next);
};

exports.authorizeCustomer = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json(info || { message: "UnAuthorized user." });

    // Check if it is a customer
    if (user.role != "Customer") {
      const error = new Error("Not a customer!");
      error.status = 401;
      return next(error);
    }

    // Attach customer's id to req.body;
    req.body.userId = user._id;
  });
};
