const express = require("express");
const userRoute = require("./Routes/UserRoute");
const cors = require("cors");
const app = express();
const GlobalErrorHandler = require("./Utils/GlobalErrorHandler");
require("dotenv").config();

// global middlewares
app.use(cors({ origin: "http://localhost:5000" }));
app.use(express.json());

app.use("/api/v1/users", userRoute);

app.use(GlobalErrorHandler);

module.exports = app;
