module.exports = (req, res, next) => {
  const { shippingAddress } = req.body;

  if (!shippingAddress)
    return res.status(400).json({ message: "Shipping Address is required" });

  next();
};
