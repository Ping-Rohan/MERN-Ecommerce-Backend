const express = require("express");
const userRoute = require("./Routes/UserRoute");
const productRoute = require("./Routes/ProductRoute");
const categoryRoute = require("./Routes/CategoryRoutes");
const cors = require("cors");
const app = express();
const GlobalErrorHandler = require("./Utils/GlobalErrorHandler");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/", express.static("./Public"));

app.use(GlobalErrorHandler);

module.exports = app;
