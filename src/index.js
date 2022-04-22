const app = require("./app");
const config = require("./config/config");

const server = app.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
