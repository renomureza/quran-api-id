const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes");
const config = require("./config/config");
const morgan = require("./config/morgan");
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require("./middlewares/error");

const app = express();

if (config.NODE_ENV !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(express.json());

app.use(cors());

app.disable("x-powered-by");

app.use("/", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
