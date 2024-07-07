const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    productId: {
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

module.exports = model("Reviews", ReviewSchema);
