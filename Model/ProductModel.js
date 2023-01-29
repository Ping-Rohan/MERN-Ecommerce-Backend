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
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Product must have category"],
    ref: "Category",
  },
  stocks: {
    type: Number,
    required: [true, "Please enter your available stocks"],
  },
  sold: {
    type: Number,
    required: true,
    default: 0,
  },

  store: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Product must belong to store"],
  },
});

ProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "store",
    select: "fullName",
  });
  next();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
