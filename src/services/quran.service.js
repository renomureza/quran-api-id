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

const getAyahsByPage = (pageNumber) => {
  const page = Number(pageNumber);
  if (page < 1 || page > 604) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Page number must be between 1 and 604");
  }

  const ayahsOnPage = quran.flatMap(surah => surah.ayahs).filter(ayah => ayah.meta.page === page);

  if (!ayahsOnPage.length) {
    // This case should ideally not happen for pages 1-604
    throw new ApiError(httpStatus.NOT_FOUND, "No ayahs found for this page");
  }

  return ayahsOnPage;
};

module.exports = { getListSurahs, getSurah, getAyahs, getAyah, getRandomSurah, getAyahsByPage };
