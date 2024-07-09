module.exports = (req, res, next) => {
  const { color } = req.body;

  if (!color) return res.status(400).json({ message: "Color is required" });

  next();
};
