const {
  updateCategoryById,
  getAllCategory,
  getCategoryById,
  createCategory,
  deleteCategoryById,
} = require("../controllers/category.controller");
const categoryMiddleware = require("../middlewares/category.middleware");

const router = require("express").Router();

router.route("/createCategory/").post(categoryMiddleware, createCategory);
router.route("/getCategoryById/:categoryId").get(getCategoryById);
router.route("/getAllCategory").get(getAllCategory);
router
  .route("/updateCategory/:categoryId")
  .put(categoryMiddleware, updateCategoryById);
router.route("/deleteCategory/:categoryId").delete(deleteCategoryById);

module.exports = router;
