const Size = require("../models/size");
const logger = require("../utils/logger")("size controller");

// Creating size
exports.createSize = (req, res, next) => {
  const { size } = req.body;

  const newSize = new Size({ size });

  newSize
    .save()
    .then((saved) => {
      if (saved)
        return res.status(201).json({ message: "Size created successfully" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Updating size
exports.updateSize = (req, res, next) => {
  const { size } = req.body;
  const { sizeId } = req.params;

  Size.findByIdAndUpdate(sizeId, { size })
    .then((updatedSize) => {
      if (updatedSize) {
        return res.json({ message: "Size updated Successfully" });
      }
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Deleting size
exports.deleteSize = (req, res, next) => {
  const { sizeId } = req.params;

  Size.findByIdAndDelete(sizeId)
    .then((result) => {
      console.log(result);
      if (result) {
        return res.json({
          message: "Size deleted successfully.",
        });
      }

      return res.status(400).json({
        message: "Size not deleted.",
      });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Get Size By Id
exports.getSizeById = (req, res, next) => {
  const { sizeId } = req.params;

  Size.findById(sizeId)
    .then((size) => {
      if (size) return res.send(size);
      return res.status(400).json({ message: "Size not found." });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Get all sizes
exports.getAllSizes = (req, res, next) => {
  Size.find({})
    .then((sizes) => res.send(sizes))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
