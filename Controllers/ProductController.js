const Product = require("../Model/ProductModel");
const Category = require("../Model/CategoryModel");
const CatchAsync = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");

exports.addProduct = CatchAsync(async (request, response, next) => {
  request.body.store = request.user._id;

  const category = await Category.findOne({ slug: request.body.category });
  if (!category) return next(new AppError("Category not recognized"));

  request.body.category = category._id;
  const product = await Product.create(request.body);

  response.status(200).json({
    message: "Product item created successfully",
    product,
  });
});

exports.getAllProducts = CatchAsync(async (request, response, next) => {
  const products = await Product.find().populate({
    path: "category",
    select: "categoryName",
  });
  response.status(200).json({
    products,
  });
});

exports.getProductById = CatchAsync(async (request, response, next) => {
  const product = await Product.findById(request.params.id).populate({
    path: "category",
    select: "categoryName",
  });
  response.status(200).json({
    product,
  });
});
