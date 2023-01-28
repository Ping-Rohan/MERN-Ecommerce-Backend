const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name cannot be empty"],
  },
  productImages: {
    type: [String],
    required: [true, "Product must have at least one image"],
  },
  productDescription: {
    type: String,
    required: [true, "Product must have description"],
  },
  // category: {
  //   type: mongoose.Schema.ObjectId,
  //   required: [true, "Product must have category"],
  //   ref: "Category",
  // },
  // stocks: {
  //   type: Number,
  //   required: [true, "Please enter your available stocks"],
  // },
  sold: Number,

  // store: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: [true, "Product must belong to store"],
  // },
  ratings: Number,
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
