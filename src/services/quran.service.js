const httpStatus = require("http-status");
const quran = require("../data/quran.json");
const ApiError = require("../utils/ApiError");
const { getRandomInt } = require("../utils/utility");

const getListSurahs = () => {
  return quran.map(({ ayahs, bismillah, ...rest }) => rest);
};

const getSurah = (surahNumber) => {
  const surah = quran[Number(surahNumber) - 1];

  if (!surah) {
    throw new ApiError(httpStatus.NOT_FOUND, "not found");
  }

  return surah;
};

const getAyahs = (surahNumber) => {
  const ayahs = quran[Number(surahNumber) - 1]?.ayahs;

  if (!ayahs) {
    throw new ApiError(httpStatus.NOT_FOUND, "not found");
  }

  return ayahs;
};

const getAyah = (surahNumber, ayahNumber) => {
  const ayah = quran[Number(surahNumber) - 1]?.ayahs[Number(ayahNumber) - 1];

  if (!ayah) {
    throw new ApiError(httpStatus.NOT_FOUND, "not found");
  }

  return ayah;
};

const getRandomSurah = () => {
  const surah = quran[getRandomInt(1, 114) - 1];
  return surah.ayahs[getRandomInt(1, surah.ayahs.length) - 1];
};

module.exports = { getListSurahs, getSurah, getAyahs, getAyah, getRandomSurah };
