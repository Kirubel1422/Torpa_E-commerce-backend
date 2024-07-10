const passport = require("passport");
const { Strategy: jwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const logger = require("../utils/logger")("Authentication - passport.js");

const User = require("../models/user");
const { genToken } = require("../utils/jwt");
const SECRET = process.env.SECRET;

module.exports = () => {
  // JWT-strategy
  passport.use(
    "jwt",
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET,
      },
      (payload, done) => {
        User.findOne({ _id: payload.id })
          .then((existingUser) => {
            done(null, existingUser);
          })
          .catch((err) => {
            logger.error(err);
            if (err) return done(err, false);
            done(null, false, { message: "User not authorized." });
          });
      }
    )
  );
  // Local signup strategy
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            // Check if that email is already registered
            if (user)
              return done(null, false, { message: "Email already exists." });

            const { firstName, lastName, phoneNumber } = req.body;

            const newUser = new User({
              email,
              firstName,
              password,
              lastName,
              phoneNumber,
            });

            newUser.save();

            done(null, newUser);
          })
          .catch((err) => {
            done(err, false);
            logger.error(err);
          });
      }
    )
  );
  // Local signin strategy
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        User.findOne({ email })
          .then(async (existingUser) => {
            // If email doesnot exist
            if (!existingUser)
              return done(null, false, {
                message: "Invalid email or password",
              });

            // Check password
            const passMatches = await User.comparePassword(
              password,
              existingUser
            );

            if (!passMatches)
              return done(null, false, {
                message: "Invalid email or password",
              });

            // Return token and user info
            const token = genToken(existingUser._id, existingUser.role);

            done(null, { user: existingUser, token });
          })
          .catch((err) => {
            logger.error(err);
            done(err, false);
          });
      }
    )
  );
};
