const router = require("express").Router();
const HomeController = require("../controllers/home.controller");

router.get("/", HomeController.home);

module.exports = router;
