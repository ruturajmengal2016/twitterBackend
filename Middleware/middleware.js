const errorHandler = (err, req, res, next) => {
  switch (res.statusCode) {
    case 400:
      res.send(err.message);
      break;
    case 404:
      res.send("Not Found");
      break;
    case 500:
      res.send("Internal Server Error!");
    default:
      next();
  }
};

module.exports = errorHandler;
