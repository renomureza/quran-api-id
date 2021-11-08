const quran = require("../data/quran.json");
const { responseJson, getRandomInt } = require("../utils/utility");

const random = (req, res) => {
  const surah = quran[getRandomInt(1, 114) - 1];
  const ayah = surah.ayahs[getRandomInt(1, surah.ayahs.length) - 1];
  res.json(responseJson(ayah, "random ayah was retrieved successfully", true));
};

module.exports = { random };
