const { isValidObjectId } = require("mongoose");

module.exports = (req, res, next) => {
  const { product } = req.body;

  if (!isValidObjectId(product))
    return res.status(400).json({ message: "Invalid Product ID" });

  next();
};
