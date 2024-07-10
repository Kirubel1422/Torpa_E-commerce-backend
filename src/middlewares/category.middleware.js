const path = require("path");
const crypto = require("crypto");
const { isImgValid } = require("../utils/validations");

module.exports = (req, res, next) => {
  const { name } = req.body;
  const { image } = req.files;

  // If no name,
  if (!name) return res.status(400).json({ message: "Name is required!" });

  // If no image,
  if (!image) {
    return res.status(400).json({ message: "Image is required!" });
  }

  // Check mime type
  if (!isImgValid(image)) {
    return res.status(400).json({ message: "Invalid mimetype" });
  }

  const imageName = crypto.randomUUID() + path.extname(image.name);

  // Save file
  image.mv(path.resolve(__dirname, "../../public/images", imageName));

  // Attach image to req.body then save in controllers
  req.body.image = imageName;

  next();
};
