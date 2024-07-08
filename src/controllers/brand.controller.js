const logger = require("../utils/logger")("brand controller");
const Brand = require("../models/brand");
const crypto = require("crypto");
const path = require("path");

exports.createBrand = (req, res, next) => {
  const { name, image } = req.body;

  const newBrand = new Brand({ name, image });

  newBrand
    .save()
    .then((saved) => {
      if (saved)
        return res.status(201).json({
          message: "Brand created successfully.",
        });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getBrandById = (req, res, next) => {
  const { brandId } = req.params;

  Brand.findById(brandId)
    .then((brand) => {
      if (brand) return res.send(brand);
      return res.status(404).json({ message: "Brand not found." });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getAllBrands = (req, res, next) => {
  Brand.find({})
    .then((brands) => {
      res.send(brands);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateBrandById = (req, res, next) => {
  const { brandId } = req.params;
  const { name, image } = req.body;

  Brand.findByIdAndUpdate(brandId, {
    name,
    image,
  })
    .then((updated) => {
      if (updated) return res.json({ message: "Brand updated successfully" });
      return res.status(400).json({ message: "Brand not updated" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteBrandById = (req, res, next) => {
  const { brandId } = req.params;

  Brand.findByIdAndDelete(brandId)
    .then((deleted) => {
      if (deleted) return res.json({ message: "Brand deleted successfully" });
      return res.status(400).json({ message: "Brand not deleted" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
