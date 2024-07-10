const {
  createColor,
  getColorById,
  getAllColors,
  updateColor,
  deleteColor,
} = require("../controllers/color.controller");
const colorMiddleware = require("../middlewares/color.middleware");
const { authorizeSeller } = require("../middlewares/authorization.middleware");
const router = require("express").Router();

router
  .route("/createColor/")
  .post(authorizeSeller, colorMiddleware, createColor);
router.route("/getColorById/:colorId").get(getColorById);
router.route("/getAllColors").get(getAllColors);
router
  .route("/updateColor/:colorId")
  .put(authorizeSeller, colorMiddleware, updateColor);
router.route("/deleteColor/:colorId").delete(authorizeSeller, deleteColor);

module.exports = router;
