const express = require("express");
const Router = express.Router();
const ProtectRoutes = require("../Helpers/protectRoute");
const productController = require("../Controllers/ProductController");
const verifyRoles = require("../Utils/VerifyRoles");
const upload = require("../Helpers/Multer");
const resize = require("../Helpers/Sharp.js");

Router.use(ProtectRoutes);
Router.use(verifyRoles);
Router.route("/").post(
  upload.array("image", 5),
  resize,
  productController.addProduct
);

module.exports = Router;
