const logger = require("../utils/logger")("category controller");
const Category = require("../models/category");

exports.createCategory = (req, res, next) => {
  const { name, image } = req.body;

  const newCategory = new Category({ name, image });

  newCategory
    .save()
    .then((saved) => {
      if (saved)
        return res.status(201).json({
          message: "Category created successfully.",
        });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getCategoryById = (req, res, next) => {
  const { categoryId } = req.params;

  Category.findById(categoryId)
    .then((category) => {
      if (category) return res.send(category);
      return res.status(404).json({ message: "Category not found." });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getAllCategory = (req, res, next) => {
  Category.find({})
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateCategoryById = (req, res, next) => {
  const { categoryId } = req.params;
  const { name, image } = req.body;

  Category.findByIdAndUpdate(categoryId, {
    name,
    image,
  })
    .then((updated) => {
      if (updated)
        return res.json({ message: "Category updated successfully" });
      return res.status(400).json({ message: "Category not updated" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteCategoryById = (req, res, next) => {
  const { categoryId } = req.params;

  Category.findByIdAndDelete(categoryId)
    .then((deleted) => {
      if (deleted)
        return res.json({ message: "Category deleted successfully" });
      return res.status(400).json({ message: "Category not deleted" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
