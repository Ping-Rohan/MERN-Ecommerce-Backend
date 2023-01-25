const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: [validator.isEmail, "Please enter valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Password doesnot match",
      },
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    city: {
      type: String,
      required: [true, "Please enter your city"],
    },
    phone: {
      type: Number,

      required: [true, "Please enter your phone"],
    },
    profileImage: {
      type: String,
      required: true,
      default:
        "https://cdn.vectorstock.com/i/1000x1000/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.webp",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
});

userSchema.methods.comparePassword = async function (enteredPW, actualPW) {
  return bcrypt.compare(enteredPW, actualPW);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
