const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const AppError = require("../Utils/AppError");
const CatchAsync = require("../Utils/CatchAsync");
const issueJwt = require("./IssueJWT");

module.exports = CatchAsync(async (request, response, next) => {
  let refreshToken;
  if (request.cookies[`x-access-token`])
    refreshToken = request.cookies[`x-access-token`];

  console.log(refreshToken);

  if (!refreshToken) return next(new AppError("Please provide refresh token"));

  const decode = jwt.decode(refreshToken);

  const document = await User.findById(decode._id);

  if (!document) return next(new AppError("user doesnot exist more"));

  const newRefreshToken = issueJwt.issueRefreshToken({ _id: document._id });
  const newAccessToken = issueJwt.issueAccessToken({ _id: document._id });

  response.setHeader("Set-Cookie", "x-access-token=" + refreshToken);
  response.status(200).json({
    newAccessToken,
  });
});
