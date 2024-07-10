const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} = require("../controllers/product.controller");
const productMiddleware = require("../middlewares/product.middleware");

const router = require("express").Router();

router.route("/getAllProducts").get(getAllProducts);
router.route("/getProductById/:productId").get(getProductById);
router.route("/createProduct").post(productMiddleware, createProduct);
router.route("/updateProduct/:productId").put(productMiddleware, updateProduct);
router.route("/deleteProductById/:productId").delete(deleteProductById);

module.exports = router;
