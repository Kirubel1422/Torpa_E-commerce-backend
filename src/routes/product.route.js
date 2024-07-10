const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} = require("../controllers/product.controller");
const productMiddleware = require("../middlewares/product.middleware");
const { authorizeSeller } = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router.route("/getAllProducts").get(getAllProducts);
router.route("/getProductById/:productId").get(getProductById);
router
  .route("/createProduct")
  .post(authorizeSeller, productMiddleware, createProduct);
router
  .route("/updateProduct/:productId")
  .put(authorizeSeller, productMiddleware, updateProduct);
router.route("/deleteProductById/:productId").delete(deleteProductById);

module.exports = router;
