const passport = require("passport");

exports.signup = (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    // If error, jump to next route
    if (err) next(err);
    console.log(user);
    // If there was problem signin up
    if (!user) return res.status(400).json(info);

    return res.status(201).json({ message: "Successfully registered!" });
  })(req, res, next);
};

exports.login = (req, res, next) => {
  passport.authenticate("local-login", (err, result, info) => {
    // If error, jump to next route
    if (err) next(err);

    // If there was problem signin up
    if (!result) return res.status(400).json(info);

    return res.json(result);
  })(req, res, next);
};
