const Product = require("../Model/ProductModel");
const CatchAsync = require("../Utils/CatchAsync");

exports.addProduct = CatchAsync(async (request, response) => {
  request.body.store = request.user._id;
  const product = await Product.create(request.body);

  response.status(200).json({
    message: "Product item created successfully",
    product,
  });
});
