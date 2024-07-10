const {
  getAllReviews,
  getReviewsById,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews.controller");
const reviewsMiddleware = require("../middlewares/reviews.middleware");
const {
  authorizeCustomer,
} = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router.route("/getAllReviews").get(getAllReviews);
router.route("/getReviewById/:reviewId").get(getReviewsById);
router
  .route("/createReview")
  .post(authorizeCustomer, reviewsMiddleware, createReview);
router
  .route("/updateReview/:reviewId")
  .put(authorizeCustomer, reviewsMiddleware, updateReview);
router.route("/deleteReview/:reviewId").delete(authorizeCustomer, deleteReview);

module.exports = router;
