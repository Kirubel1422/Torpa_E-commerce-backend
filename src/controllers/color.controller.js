const Color = require("../models/color");
const logger = require("../utils/logger")("color controller");

// Creating color
exports.createColor = (req, res, next) => {
  const { color } = req.body;

  const newColor = new Color({ color });

  newColor
    .save()
    .then((saved) => {
      if (saved)
        return res.status(201).json({ message: "Color created successfully" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Updating color
exports.updateColor = (req, res, next) => {
  const { color } = req.body;
  const { colorId } = req.params;

  Color.findByIdAndUpdate(colorId, { color })
    .then((updatedColor) => {
      if (updatedColor) {
        return res.json({ message: "Color updated Successfully" });
      }

      return res.status(400).json({ message: "Color not updated" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Deleting size
exports.deleteColor = (req, res, next) => {
  const { colorId } = req.params;

  Color.findByIdAndDelete(colorId)
    .then((result) => {
      console.log(result);
      if (result) {
        return res.json({
          message: "Color deleted successfully.",
        });
      }

      return res.status(400).json({
        message: "Color not deleted.",
      });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Get Color By Id
exports.getColorById = (req, res, next) => {
  const { colorId } = req.params;

  Color.findById(colorId)
    .then((color) => {
      if (color) return res.send(color);
      return res.status(400).json({ message: "Color not found." });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Get all colors
exports.getAllColors = (req, res, next) => {
  Color.find({})
    .then((colors) => res.send(colors))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
