const {
  getAllSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
} = require("../controllers/size.controller");
const sizeMiddleware = require("../middlewares/size.middleware");
const router = require("express").Router();

router.route("/getAllSizes").get(getAllSizes);
router.route("/getSizeById/:sizeId").get(getSizeById);
router.route("/createSize").post(sizeMiddleware, createSize);
router.route("/updateSize/:sizeId").put(sizeMiddleware, updateSize);
router.route("/deleteSize/:sizeId").delete(deleteSize);

module.exports = router;
