const express = require("express");
const router = require("./Router/router");
const cors = require("cors");
const errorHandler = require("./Middleware/middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use("/api", router);
app.use(errorHandler);
app.listen(5500, () => {
  console.log("server is listening...");
});
