module.exports = (req, res, next) => {
  const { name, email, rating, productId } = req.body;

  if (!name || !email || !rating || !productId)
    return res.status(400).json({
      message: "All fields are required!",
    });

  next();
};
