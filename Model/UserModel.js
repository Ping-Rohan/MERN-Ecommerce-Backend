const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
        "https://img.freepik.com/free-photo/indian-business-man-with-crossed-arm-dark-wall_231208-2668.jpg?w=900&t=st=1674902498~exp=1674903098~hmac=6509adf81297c0dd45a9abbadd9e6d0d4bb8c4fe37f014a23e8b73d0722cfbee",
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

userSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  this.accountVerificationToken = hashedToken;
  return token;
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
