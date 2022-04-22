const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

const server = app.listen(config.PORT, () => {
  logger.info(`server is running on port ${config.PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
