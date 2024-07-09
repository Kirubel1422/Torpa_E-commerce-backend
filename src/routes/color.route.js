const {
  createColor,
  getColorById,
  getAllColors,
  updateColor,
  deleteColor,
} = require("../controllers/color.controller");
const colorMiddleware = require("../middlewares/color.middleware");

const router = require("express").Router();

router.route("/createColor/").post(colorMiddleware, createColor);
router.route("/getColorById/:colorId").get(getColorById);
router.route("/getAllColors").get(getAllColors);
router.route("/updateColor/:colorId").put(colorMiddleware, updateColor);
router.route("/deleteColor/:colorId").delete(deleteColor);

module.exports = router;
