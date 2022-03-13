const quran = require("../data/quran.json");
const { responseJson } = require("../utils/utility");

const getSurahs = (req, res) => {
  const data = quran.map(({ ayahs, bismillah, ...rest }) => rest);
  res.json(responseJson(data, "surahs was retrieved successfully", true));
};

const getSurah = (req, res) => {
  const { surahNumber } = req.params;
  const data = quran[Number(surahNumber) - 1];
  if (!data) {
    return res.status(404).json(responseJson(null, "surah not found", false));
  }
  res.json(responseJson(data, "surah was retrieved successfully", true));
};

const getAyahs = (req, res) => {
  const { surahNumber } = req.params;
  const data = quran[Number(surahNumber) - 1]?.ayahs;
  if (!data) {
    return res.status(404).json(responseJson(null, "surah not found", false));
  }
  res.json(responseJson(data, "ayahs was retrieved successfully", true));
};

const getAyah = (req, res) => {
  const { surahNumber, ayahNumber } = req.params;
  const data = quran[Number(surahNumber) - 1]?.ayahs[Number(ayahNumber) - 1];
  if (!data) {
    return res.status(404).json(responseJson(null, "ayah not found", false));
  }
  res.json(responseJson(data, "ayah was retrieved successfully", true));
};

module.exports = { getSurahs, getSurah, getAyahs, getAyah };
