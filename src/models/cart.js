const { model, Schema } = require("mongoose");

const Cart = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      timestamps: true,
    },
  }
);

module.exports = model("Cart", Cart);
