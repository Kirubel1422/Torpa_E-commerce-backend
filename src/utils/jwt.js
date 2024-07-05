const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

exports.genToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: "1d" });
};
