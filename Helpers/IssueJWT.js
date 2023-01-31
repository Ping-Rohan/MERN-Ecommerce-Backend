const jwt = require("jsonwebtoken");
const CatchAsync = require("../Utils/CatchAsync");

exports.issueAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

exports.issueRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
