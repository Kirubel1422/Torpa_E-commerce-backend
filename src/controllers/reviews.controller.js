const Reviews = require("../models/reviews");
const logger = require("../utils/logger")("Reviews controller");

exports.getAllReviews = (req, res, next) => {
  Reviews.find({})
    .populate("productId")
    .then((reviews) => res.send(reviews))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getReviewsById = (req, res, next) => {
  const { reviewId } = req.params;
  Reviews.findById(reviewId)
    .populate("productID")
    .then((review) => res.send(review))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.createReview = (req, res, next) => {
  const { name, email, comment, rating } = req.body;

  const newReview = new Reviews({ name, email, comment, rating });

  newReview
    .save()
    .then((savedReview) => {
      if (savedReview)
        return res.status(201).json({
          message: "Review saved successfully",
        });

      res.status(400).json({
        message: "Review not saved",
      });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.updateReview = (req, res, next) => {
  const { name, rating, comment } = req.body;
  const { reviewId } = req.params;

  Reviews.findByIdAndUpdate(reviewId, { name, rating, comment })
    .then((updatedReview) => {
      if (updatedReview)
        return res.json({ message: "Successfully updated review" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.deleteReview = (req, res, next) => {
  const { reviewId } = req.params;

  Reviews.findByIdAndDelete(reviewId).then((deletedReview) => {
    if (deletedReview)
      return res.json({ message: "Successfully deleted review" });

    return res.status(400).json({ message: "Review not deleted" });
  });
};
