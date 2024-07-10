const {
  createBrand,
  getBrandById,
  getAllBrands,
  updateBrandById,
  deleteBrandById,
} = require("../controllers/brand.controller");
const brandMiddleware = require("../middlewares/brand.middleware");
const { authorizeSeller } = require("../middlewares/authorization.middleware");
const router = require("express").Router();

router
  .route("/createBrand/")
  .post(authorizeSeller, brandMiddleware, createBrand);
router.route("/getBrandById/:brandId").get(getBrandById);
router.route("/getAllBrands").get(getAllBrands);
router
  .route("/updateBrand/:brandId")
  .put(authorizeSeller, brandMiddleware, updateBrandById);
router.route("/deleteBrand/:brandId").delete(authorizeSeller, deleteBrandById);

module.exports = router;
