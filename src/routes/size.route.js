const {
  getAllSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
} = require("../controllers/size.controller");
const {
  authorizeSeller,
  authorizeCustomer,
} = require("../middlewares/authorization.middleware");
const sizeMiddleware = require("../middlewares/size.middleware");
const router = require("express").Router();

router.route("/getAllSizes").get(getAllSizes);
router.route("/getSizeById/:sizeId").get(getSizeById);
router.route("/createSize").post(authorizeSeller, sizeMiddleware, createSize);
router
  .route("/updateSize/:sizeId")
  .put(authorizeSeller, sizeMiddleware, updateSize);
router.route("/deleteSize/:sizeId").delete(authorizeSeller, deleteSize);

module.exports = router;
