const sharp = require("sharp");
const crypto = require("crypto");
const catchAsync = require("../Utils/CatchAsync");

const resizeImage = catchAsync(async (request, response, next) => {
  request.body.productImages = [];
  await Promise.all(
    request.files.map((file, i) => {
      const randomByte = crypto.randomBytes(20).toString("hex");
      file.filename = `${randomByte}-${Date.now()}.jpeg`;
      sharp(file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .toFile(`Public/${file.filename}`);

      request.body.productImages.push(file.filename);
    })
  );

  next();
});

module.exports = resizeImage;
