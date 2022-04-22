const express = require("express");
const homeRoute = require("./home.route");
const randomRoute = require("./random.route");
const surahsRoute = require("./surahs.route");

const router = express.Router();

const routes = [
  {
    path: "/",
    route: homeRoute,
  },
  {
    path: "/surahs",
    route: surahsRoute,
  },
  {
    path: "/random",
    route: randomRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
