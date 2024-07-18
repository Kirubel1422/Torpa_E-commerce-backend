const Favourite = require("../models/favourite");
const logger = require("../utils/logger")("Favourite Controller");

exports.getAllFavourites = (req, res, next) => {
  Favourite.find({})
    .then((favouriteItems) => {
      res.send(favouriteItems);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.getFavouritesByUserId = (req, res, next) => {
  const { userId } = req.body;

  Favourite.find({ userId })
    .populate("product")
    .then((favourites) => {
      res.send(favourites);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

exports.addToFavourites = (req, res, next) => {
  const { userId, product } = req.body;

  const newFavourite = new Favourite({
    userId,
    product,
  });

  newFavourite.save().then((favourite) => {
    if (!favourite) {
      return res
        .status(400)
        .json({ message: "Failed to add item to favourites" });
    }
    res.status(201).json({ message: "Item added to favourites." });
  });
};

exports.removeFromFavourites = (req, res, next) => {
  const { itemId } = req.params;

  Favourite.findByIdAndDelete(itemId).then((item) => {
    if (!item) {
      return res
        .status(400)
        .json({ message: "Failed to remove item from favourites" });
    }

    res.json({ message: "Favourite Item Removed" });
  });
};

exports.removeAllFavourites = (req, res, next) => {
  const { userId } = req.body;
  Favourite.deleteMany({ userId }).then((favourites) => {
    if (!favourites) {
      return res
        .status(400)
        .json({ message: "Failed to remove all items from favourites" });
    }
    res.json({ message: "All Favourite Items Removed" });
  });
};
