const User = require("../Model/UserModel");
const catchAsync = require("../Utils/CatchAsync");
const issueJWT = require("../Helpers/IssueJWT");
const AppError = require("../Utils/AppError");

// signup
exports.signup = catchAsync(async (request, response, next) => {
  const document = await User.create(request.body);

  response.status(200).json({
    message: "Account created successfully",
    document,
  });
});

// login
exports.login = catchAsync(async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password)
    return next(new AppError("Email and password required"));

  const document = await User.findOne({ email });

  if (
    !document ||
    !(await document.comparePassword(password, document.password))
  )
    return next(new AppError("Email or password incorrect"));

  const accessToken = issueJWT.issueAccessToken({ _id: document._id });
  const refreshToken = issueJWT.issueRefreshToken({ _id: document._id });

  response.cookie("auth", refreshToken, {
    httpOnly: true,
  });

  response.status(200).json({
    message: "Logged in successfully",
    accessToken,
  });
});
