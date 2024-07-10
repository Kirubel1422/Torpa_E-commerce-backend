const { isValidID, isImgValid } = require("../utils/validations");
const path = require("path");
const crypto = require("crypto");

module.exports = (req, res, next) => {
  const {
    brand,
    category,
    productName,
    description,
    price,
    color,
    size,
    reviews,
    shippingInfo,
    images,
  } = req.body;

  // Check if brand id is valid
  if (brand && !isValidID(brand))
    return res.status(400).json({
      message: "Invalid brand.",
    });

  // Check availability of required fields
  if (!productName || !description || !price || !images.length)
    return res.status(400).json({
      message: "All fields are required!",
    });

  // Handle img upload
  let imgs = [];
  let img;
  if (Array.isArray(images)) {
    for (const img of images) {
      if (!isImgValid(img))
        return res.status(400).json({ message: "Invalid mime type." });

      const imgName = crypto.randomUUID() + path.extname(img);
      img.mv(path.resolve(__dirname, "../../public/images", imgName));
      imgs.push(imgName);
    }

    req.body.imgs = imgs;
  } else {
    if (!isImgValid(images))
      return res.status(400).json({ message: "Invalid mime type." });

    const imgName = crypto.randomUUID() + path.extname(images);
    img.mv(path.resolve(__dirname, "../../public/images", imgName));

    req.body.imgs = imgName;
  }

  // Validate product color
  if (color.length && color.find((colId) => !isValidID(colId)))
    return res.status(400).json({
      message: "Invalid color Id.",
    });

  // validate product size
  if (size.length && size.find((sizeId) => !isValidID(sizeId)))
    return res.status(400).json({
      message: "Invalid size Id.",
    });

  // validate product reviews
  if (reviews.length && reviews.find((revId) => !isValidID(revId)))
    return res.status(400).json({
      message: "Invalid review Id.",
    });

  // validate product shippingInfo
  if (shippingInfo.length && shippingInfo.find((shipId) => !isValidID(shipId)))
    return res.status(400).json({
      message: "Invalid ShippingInfo Id.",
    });

  // validate product shippingInfo
  if (category.length && category.find((categoryId) => !isValidID(categoryId)))
    return res.status(400).json({
      message: "Invalid category Id.",
    });

  next();
};
