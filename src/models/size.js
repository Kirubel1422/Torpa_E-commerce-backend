const { Schema, model } = require("mongoose");

const SizeSchema = new Schema(
  {
    size: {
      type: String,
      enum: ["extra-large", "large", "medium", "small", "extra-small"],
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

module.exports = model("Size", SizeSchema);
