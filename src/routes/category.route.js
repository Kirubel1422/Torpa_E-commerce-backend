const {
  updateCategoryById,
  getAllCategory,
  getCategoryById,
  createCategory,
  deleteCategoryById,
} = require("../controllers/category.controller");
const categoryMiddleware = require("../middlewares/category.middleware");
const { authorizeSeller } = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router
  .route("/createCategory/")
  .post(authorizeSeller, categoryMiddleware, createCategory);
router.route("/getCategoryById/:categoryId").get(getCategoryById);
router.route("/getAllCategory").get(getAllCategory);
router
  .route("/updateCategory/:categoryId")
  .put(authorizeSeller, categoryMiddleware, updateCategoryById);
router
  .route("/deleteCategory/:categoryId")
  .delete(authorizeSeller, deleteCategoryById);

module.exports = router;
