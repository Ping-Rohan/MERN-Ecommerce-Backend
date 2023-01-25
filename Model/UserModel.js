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
    passwordChangedAt: Date,
    accountVerificationToken: String,
    accountVerificationTokenExpires: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now();
});

userSchema.methods.comparePassword = async function (enteredPW, actualPW) {
  return bcrypt.compare(enteredPW, actualPW);
};

userSchema.methods.hasChangedPasswordRecently = function (jwtIssued) {
  if (this.passwordChangedAt) {
    const passwordChangedTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return passwordChangedTime > jwtIssued;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
