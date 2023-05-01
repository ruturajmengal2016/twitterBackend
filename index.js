const express = require("express");
const router = require("./Router/router");
const cors = require("cors");
const errorHandler = require("./Middleware/middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use("/api", router);
app.use(errorHandler);
app.listen(5500, () => {
  console.log("server is listening...");
});
