module.exports = (req, res, next) => {
  const { name, email, rating } = req.body;

  if (!name || !email || !rating)
    return res.status(400).json({
      message: "All fields are required!",
    });

  next();
};
