const express = require("express");
const Router = express.Router();
const userController = require("../Controllers/UserController");
const refreshToken = require("../Helpers/RefreshAccessToken");

// route : api/v1/users
Router.route("/signup").post(userController.signup);
Router.route("/login").post(userController.login);
Router.route("/refresh").get(refreshToken);

module.exports = Router;
