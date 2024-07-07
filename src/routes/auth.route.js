const router = require("express").Router();
const { signup, login } = require("../controllers/auth.controller");
const loginMiddleware = require("../middlewares/login.middleware");
const signupMiddleware = require("../middlewares/login.middleware");

router.route("/signup").post(signupMiddleware, signup);
router.route("/login").post(loginMiddleware, login);

module.exports = router;
