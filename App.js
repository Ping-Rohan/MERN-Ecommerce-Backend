const express = require("express");
const userRoute = require("./Routes/UserRoute");
const productRoute = require("./Routes/ProductRoute");
const categoryRoute = require("./Routes/CategoryRoutes");
const CartRoute = require("./Routes/CartRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();
app.use(cookieParser());

const GlobalErrorHandler = require("./Utils/GlobalErrorHandler");
require("dotenv").config();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: true,
  })
);
app.use(express.json());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/cart", CartRoute);
app.use("/", express.static("./Public"));

app.use(GlobalErrorHandler);

module.exports = app;
