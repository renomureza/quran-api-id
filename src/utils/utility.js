const path = require("path");
const logger = require("../config/logger");

const delay = (second = 2) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
};

const logError = (message) => logger.error("\x1b[31m%s\x1b[0m", message);
const logSuccess = (message) => logger.info("\x1b[32m%s\x1b[0m", message);
const logInfo = (message) => logger.info("\x1b[36m%s\x1b[0m", message);

const cleanHtmlTag = (str) => str.replace(/(<([^>]+)>)/gi, "").trim();
const pathToData = (...paths) => path.resolve("src/data", ...paths);
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const responseJson = (data, message, success) => ({
  success,
  message,
  data,
});

module.exports = {
  cleanHtmlTag,
  delay,
  logError,
  logSuccess,
  logInfo,
  pathToData,
  responseJson,
  getRandomInt,
};
