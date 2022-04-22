const { quranService } = require("../services");

const random = (req, res) => {
  const randomSurah = quranService.getRandomSurah();
  return res.send(randomSurah);
  // const surah = quran[getRandomInt(1, 114) - 1];
  // const ayah = surah.ayahs[getRandomInt(1, surah.ayahs.length) - 1];
  // res.json(responseJson(ayah, "random ayah was retrieved successfully", true));
};

module.exports = { random };
