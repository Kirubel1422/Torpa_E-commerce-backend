module.exports = (req, res, next) => {
  const { size } = req.body;
  const validValues = [
    "extra-large",
    "large",
    "medium",
    "small",
    "extra-small",
  ];

  if (!validValues.find((item) => item == size.toLowerCase())) {
    res.status(400).json({
      message: "Invalid size value.",
    });
  }

  next();
};
