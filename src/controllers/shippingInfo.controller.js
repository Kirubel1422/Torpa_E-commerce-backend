const ShippingInfo = require("../models/shippingInfo");
const logger = require("../utils/logger")("shippingInfo controller");

// Creating shipping info
exports.createShippingInfo = (req, res, next) => {
  const { shippingAddress } = req.body;

  const newShippingInfo = new ShippingInfo({ shippingAddress });

  newShippingInfo
    .save()
    .then((saved) => {
      if (saved)
        return res
          .status(201)
          .json({ message: "Shipping Info created successfully" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Updating shipping-info
exports.updateShippingInfo = (req, res, next) => {
  const { shippingAddress } = req.body;
  const { shippingInfoId } = req.params;

  ShippingInfo.findByIdAndUpdate(shippingInfoId, { shippingAddress })
    .then((updatedShippingInfo) => {
      if (updatedShippingInfo) {
        return res.json({ message: "Shipping Info updated Successfully" });
      }

      return res.status(400).json({ message: "Shipping Info not updated" });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Deleting shipping info
exports.deleteShippingInfo = (req, res, next) => {
  const { shippingInfoId } = req.params;

  ShippingInfo.findByIdAndDelete(shippingInfoId)
    .then((result) => {
      console.log(result);
      if (result) {
        return res.json({
          message: "Shipping Info deleted successfully.",
        });
      }

      return res.status(400).json({
        message: "Shipping Info not deleted.",
      });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Get Shipping Info By Id
exports.getShippingInfoById = (req, res, next) => {
  const { shippingInfoId } = req.params;

  ShippingInfo.findById(shippingInfoId)
    .then((shippingInfo) => {
      if (shippingInfo) return res.send(shippingInfo);
      return res.status(400).json({ message: "ShippingInfo not found." });
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};

// Get all shipping infos
exports.getAllShippingInfos = (req, res, next) => {
  ShippingInfo.find({})
    .then((shippingInfos) => res.send(shippingInfos))
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
