const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const AppError = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const issueJwt = require("./IssueJWT");

module.exports = CatchAsync(async (request, response, next) => {
  let refreshToken;
  if (request.cookies.auth) refreshToken = request.cookies.auth;

  console.log(refreshToken);

  if (!refreshToken) return next(new AppError("Please provide refresh token"));

  const decode = jwt.decode(refreshToken);

  const document = await User.findById(decode._id);

  if (!document) return next(new AppError("user doesnot exist more"));

  const newRefreshToken = issueJwt.issueRefreshToken({ _id: document._id });
  const newAccessToken = issueJwt.issueAccessToken({ _id: document._id });

  response.clearCookie("auth");
  response.cookie("auth", newRefreshToken, {
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });

  response.status(200).json({
    newAccessToken,
  });
});
