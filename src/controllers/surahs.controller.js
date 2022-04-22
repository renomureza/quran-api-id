const { quranService } = require("../services");

const getSurahs = (req, res) => {
  const listSurahs = quranService.getListSurahs();
  return res.send(listSurahs);
};

const getSurah = (req, res) => {
  const { surahNumber } = req.params;
  const surah = quranService.getSurah(surahNumber);
  return res.send(surah);
};

const getAyahs = (req, res) => {
  const { surahNumber } = req.params;
  const ayahs = quranService.getAyahs(surahNumber);
  return res.send(ayahs);
};

const getAyah = (req, res) => {
  const { surahNumber, ayahNumber } = req.params;
  const surah = quranService.getAyah(surahNumber, ayahNumber);
  return res.send(surah);
};

module.exports = { getSurahs, getSurah, getAyahs, getAyah };
