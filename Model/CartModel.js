const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
