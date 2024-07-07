const { Schema, model } = require("mongoose");

const ShippingInfoSchema = new Schema(
  {
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
      timestamps: true,
    },
  }
);

module.exports = model("ShippingInfoSchema", ShippingInfoSchema);
