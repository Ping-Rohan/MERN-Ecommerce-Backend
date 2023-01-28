const AppError = require("./AppError");

module.exports = (request, response, next) => {
  const { user } = request;
  if (!user.isAdmin)
    return next(new AppError("Only admin can peform this action"));
  next();
};
