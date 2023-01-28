const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Category name cannot be empty"],
  },
  categoryImage: {
    type: String,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
