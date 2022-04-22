const router = require("express").Router();
const SurahsController = require("../controllers/surahs.controller");

router.get("/", SurahsController.getSurahs);
router.get("/:surahNumber", SurahsController.getSurah);
router.get("/:surahNumber/ayahs", SurahsController.getAyahs);
router.get("/:surahNumber/ayahs/:ayahNumber", SurahsController.getAyah);

module.exports = router;
