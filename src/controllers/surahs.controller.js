const { quranService } = require("../services");

/* eslint no-console: ["error", { allow: ["log"] }] */

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
  let ayahs = quranService.getAyahs(surahNumber);
  const { from, to } = req.query;

  if (from || to) {
    ayahs = quranService.getAyahsRange(surahNumber, from, to);
  }

  return res.send(ayahs);
};

const getAyah = (req, res) => {
  const { surahNumber, ayahNumber } = req.params;
  const surah = quranService.getAyah(surahNumber, ayahNumber);
  return res.send(surah);
};

module.exports = { getSurahs, getSurah, getAyahs, getAyah };
