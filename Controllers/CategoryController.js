const Category = require("../Model/CategoryModel");
const CatchAsync = require("../Utils/CatchAsync");
const slugify = require("slugify");

// slug options
const options = {
  replacement: "-",
  remove: undefined,
  lower: true,
  strict: false,
  locale: "en",
  trim: true,
};

exports.createCategory = CatchAsync(async (request, response) => {
  const slug = slugify(request.body.categoryName, options);
  request.body.slug = slug;
  const category = await Category.create(request.body);

  response.status(200).json({
    message: "Category created successfully",
    category,
  });
});

exports.suggestCategory = CatchAsync(async (request, response, next) => {
  console.log(request.body.input);
  const category = await Category.find({
    slug: { $regex: ".*" + request.body.input + ".*", $options: "i" },
  });
  response.status(200).json({
    category,
  });
});
