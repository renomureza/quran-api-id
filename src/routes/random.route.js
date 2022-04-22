const router = require("express").Router();
const RandomController = require("../controllers/random.controller");

router.get("/", RandomController.random);

module.exports = router;
