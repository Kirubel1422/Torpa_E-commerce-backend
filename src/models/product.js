const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
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
        required: true,
      },
    ],
    size: [
      {
        type: Schema.Types.ObjectId,
        ref: "Size",
        required: true,
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
        required: true,
      },
    ],
    shippingInfo: [
      {
        type: Schema.Types.ObjectId,
        ref: "ShippingInfo",
        required: true,
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
