const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

module.exports = {
  BASE_URL: process.env.BASE_URL || "http://localhost:3005",
  PORT: process.env.PORT || 3005,
};
