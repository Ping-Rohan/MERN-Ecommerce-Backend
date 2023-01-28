const multer = require("multer");
const AppError = require("../Utils/AppError");

const storage = multer.memoryStorage();

const multerFilter = (request, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Only image is accepted"), false);
  }
};

const upload = multer({
  storage,
  fileFilter: multerFilter,
});

module.exports = upload;
