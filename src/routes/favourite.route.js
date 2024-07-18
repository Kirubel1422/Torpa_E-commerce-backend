const router = require("express").Router();
const {
  getAllFavourites,
  getFavouritesByUserId,
  addToFavourites,
  removeFromFavourites,
  removeAllFavourites,
} = require("../controllers/favourites.controller");
const {
  authorizeCustomer,
  authorizeSeller,
} = require("../middlewares/authorization.middleware");
const favouritesMiddleware = require("../middlewares/favourites.middleware");

router.route("/getAllFavourites").get(authorizeSeller, getAllFavourites);
router
  .route("/getFavouritesByUserId")
  .get(authorizeCustomer, getFavouritesByUserId);
router
  .route("/addToFavourites")
  .post(authorizeCustomer, favouritesMiddleware, addToFavourites);
router
  .route("/removeFromFavourites/:itemId")
  .delete(authorizeCustomer, removeFromFavourites);
router
  .route("/removeAllFavouriteItems")
  .delete(authorizeCustomer, removeAllFavourites);

module.exports = router;
