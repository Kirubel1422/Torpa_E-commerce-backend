const {
  createBrand,
  getBrandById,
  getAllBrands,
  updateBrandById,
  deleteBrandById,
} = require("../controllers/brand.controller");
const brandMiddleware = require("../middlewares/brand.middleware");

const router = require("express").Router();

router.route("/createBrand/").post(brandMiddleware, createBrand);
router.route("/getBrandById/:brandId").get(getBrandById);
router.route("/getAllBrands").get(getAllBrands);
router.route("/updateBrand/:brandId").put(brandMiddleware, updateBrandById);
router.route("/deleteBrand/:brandId").delete(deleteBrandById);

module.exports = router;
