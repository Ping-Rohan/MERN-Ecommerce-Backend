const CatchAsync = require("../Utils/CatchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../Utils/AppError");
const User = require("../Model/UserModel");

module.exports = CatchAsync(async (request, response, next) => {
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    token = request.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError("Please provide an access token"));

  const decode = jwt.decode(token);

  const document = await User.findById(decode._id);

  if (!document) return next(new AppError("User no longer exists"));

  if (document.hasChangedPasswordRecently(decode.iat))
    return next(new AppError("Please login with new password"));

  request.user = document;
  next();
});
