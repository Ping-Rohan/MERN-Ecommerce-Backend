const app = require("./App");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Ecommerce")
  .then(() => console.log("database connected"));

app.listen(5000, () => {
  console.log("server started");
});
