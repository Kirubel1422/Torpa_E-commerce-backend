const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: [
      {
        type: Schema.Types.ObjectId,
        ref: "Color",
      },
    ],
    size: [
      {
        type: Schema.Types.ObjectId,
        ref: "Size",
      },
    ],
    minOrder: {
      type: Number,
      default: 1,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
    shippingInfo: [
      {
        type: Schema.Types.ObjectId,
        ref: "ShippingInfo",
      },
    ],
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 1,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    productOwner: {
      type: Schema.Types.ObjectId,
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

module.exports = model("Product", ProductSchema);
