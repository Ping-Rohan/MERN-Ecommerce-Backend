const mongoose = require("mongoose");

const slugOPT = {
  separator: "-",
  lang: "en",
  truncate: 100,
};

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Category name cannot be empty"],
    unique: true,
  },
  slug: {
    type: String,
    required: [true, "Missing slug"],
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
