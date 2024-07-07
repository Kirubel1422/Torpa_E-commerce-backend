const { Schema, model } = require("mongoose");

const ColorSchema = new Schema(
  {
    color: {
      type: String,
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

module.exports = model("Color", ColorSchema);
