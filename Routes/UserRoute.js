const express = require("express");
const Router = express.Router();
const userController = require("../Controllers/UserController");

// route : api/v1/users
Router.route("/signup").post(userController.signup);
Router.route("/login").post(userController.login);

module.exports = Router;
