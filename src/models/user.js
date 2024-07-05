const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Seller", "Customer"],
      default: "Customer",
    },
    address: {
      type: Object,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
      timestamps: true,
    },
  }
);

// run this pre hook before saving each documen
UserSchema.pre("save", async function (next) {
  if (!this.isModified()) next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// For comparing password
UserSchema.statics.comparePassword = async function (password, user) {
  // decrypt password
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

module.exports = model("User", UserSchema);
