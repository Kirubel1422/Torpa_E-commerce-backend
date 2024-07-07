const { Schema, model } = require("mongoose");

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: function (doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
    },
    timestamps: true,
  }
);

module.exports = model("Brand", BrandSchema);
