const Products = require("../models/product");
const logger = require("../utils/logger")("Product controller");

exports.createProduct = (req, res, next) => {
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
    imgs,
    userId,
    stock,
  } = req.body;

  const newProduct = new Products({
    brand,
    category,
    productName,
    description,
    price,
    color,
    size,
    reviews,
    shippingInfo,
    images: imgs,
    stock,
    admin: userId,
  });

  newProduct
    .save()
    .then((savedProd) => {
      if (savedProd)
        return res.status(201).json({
          message: "Product created successfully!",
        });
      return res.status(400).json({
        message: "Product not created.",
      });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const { productId } = req.params;
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
    imgs,
    stock,
    discount,
    minOrder,
  } = req.body;

  Products.findByIdAndUpdate(productId, {
    brand,
    category,
    productName,
    description,
    price,
    color,
    size,
    reviews,
    shippingInfo,
    images: imgs,
    stock,
    discount,
    minOrder,
  })
    .then((updatedProd) => {
      if (updatedProd) {
        return res.send({ message: "Product updated successfully!" });
      }

      return res.status(400).json({ message: "Product not updated" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getAllProducts = (req, res, next) => {
  Products.find({})
    .populate("brand")
    .populate("color")
    .populate("size")
    .populate("shippingInfo")
    .populate("reviews")
    .populate("category")
    .then((products) => res.send(products))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getProductById = (req, res, next) => {
  const { productId } = req.params;
  Products.findById(productId)
    .populate("brand")
    .populate("color")
    .populate("size")
    .populate("shippingInfo")
    .populate("reviews")
    .populate("category")
    .then((product) => res.send(product))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteProductById = (req, res, next) => {
  const { productId } = req.params;

  Products.findByIdAndDelete(productId).then((deletedProduct) => {
    if (deletedProduct)
      return res.send({ message: "Product deleted successfully" });
    return res.status(400).json({ message: "Product not deleted." });
  });
};
