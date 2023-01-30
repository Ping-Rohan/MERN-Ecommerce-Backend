const express = require("express");
const Router = express.Router();
const ProtectRoutes = require("../Helpers/protectRoute");
const productController = require("../Controllers/ProductController");
const verifyRoles = require("../Utils/VerifyRoles");
const upload = require("../Helpers/Multer");
const resize = require("../Helpers/Sharp.js");

Router.use(ProtectRoutes);
Router.route("/")
  .post(
    verifyRoles,
    upload.array("image", 5),
    resize,
    productController.addProduct
  )
  .get(productController.getAllProducts);

Router.route("/:id").get(productController.getProductById);

module.exports = Router;
