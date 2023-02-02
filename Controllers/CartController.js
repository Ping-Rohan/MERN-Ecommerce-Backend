const Cart = require("../Model/CartModel");
const CatchAsync = require("../Utils/CatchAsync");

exports.createCart = CatchAsync(async (request, response, next) => {
  request.body.user = request.user._id;
  // check if product already exist in cart
  const alreadyExist = await Cart.findOne({
    product: request.body.product,
    user: request.user._id,
  });
  const { quantity } = request.body;

  let cart;
  // if exist
  if (alreadyExist) {
    cart = await Cart.findOneAndUpdate(
      { product: request.body.product, user: request.user._id },
      {
        quantity: alreadyExist.quantity + quantity,
      },
      { new: true }
    );
  } else {
    cart = await Cart.create(request.body);
  }

  response.status(200).json({
    cart,
  });
});

exports.getCartOfUser = CatchAsync(async (request, response, next) => {
  const carts = await Cart.find({ user: request.user._id }).populate({
    path: "product",
    select: "productName productImages price",
  });
  response.status(200).json({
    carts,
  });
});

exports.deleteCart = CatchAsync(async (request, response, next) => {
  let document = await Cart.findOne({
    product: request.body.product,
    user: request.user._id,
  });
  if (document.quantity > 1) {
    document = await Cart.findOneAndUpdate(
      { product: request.body.product, user: request.user._id },
      { quantity: document.quantity - 1 },
      { new: true }
    );
  } else {
    document = await findOneAndDelete({
      product: request.body.product,
      user: request.user._id,
    });
  }

  response.status(200).json({
    document,
  });
});
