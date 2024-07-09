const {
  getAllReviews,
  getReviewsById,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews.controller");
const reviewsMiddleware = require("../middlewares/reviews.middleware");

const router = require("express").Router();

router.route("/getAllReviews").get(getAllReviews);
router.route("/getReviewById/:reviewId").get(getReviewsById);
router.route("/createReview").post(reviewsMiddleware, createReview);
router.route("/updateReview/:reviewId").put(reviewsMiddleware, updateReview);
router.route("/deleteReview/:reviewId").delete(deleteReview);

module.exports = router;
