const Size = require("../models/size");

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
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// Updating size
exports.updateSize = (req, res, next) => {
  const { size } = req.body;
  const { sizeId } = req.params;

  Size.findByIdAndUpdate(sizeId, size)
    .then((updatedSize) => {
      if (updatedSize) {
        return res.json({ message: "Size updated Successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// Deleting size
exports.deleteSize = (req, res, next) => {
  const { sizeId } = req.params;

  Size.findByIdAndDelete(sizeId)
    .then((result) => {
      if (result.deleteCount > 0) {
        return res.json({
          message: "Size deleted successfully.",
        });
      }

      return res.status(400).json({
        message: "Size not deleted.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// Get Size By Id
exports.getSizeById = (req, res, next) => {
  const { sizeId } = req.params;

  Size.findById(sizeId)
    .then((size) => {
      if (size) return res.send(size);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// Get all sizes
exports.getAllSizes = (req, res, next) => {
  Size.find({})
    .then((sizes) => res.send(sizes))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};
