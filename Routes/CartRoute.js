const express = require("express");
const Router = express.Router();
const CartController = require("../Controllers/CartController");
const protectRoute = require("../Helpers/protectRoute");

Router.use(protectRoute);
Router.route("/")
  .post(CartController.createCart)
  .get(CartController.getCartOfUser);
Router.route("/:id").delete(CartController.deleteCart);

module.exports = Router;
