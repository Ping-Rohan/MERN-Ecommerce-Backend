const express = require("express");
const Router = express.Router();
const ProtectRoutes = require("../Helpers/protectRoute");
const CategoryController = require("../Controllers/CategoryController");

Router.use(ProtectRoutes);
Router.route("/").post(CategoryController.createCategory);
Router.route("/suggest").post(CategoryController.suggestCategory);

module.exports = Router;
