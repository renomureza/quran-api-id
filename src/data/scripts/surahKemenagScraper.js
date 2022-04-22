const fs = require("fs/promises");
const { default: axios } = require("axios");
const {
  delay,
  logSuccess,
  logError,
  logInfo,
  pathToData,
} = require("../../utils/utility");

const getListSurah = () => {
  return axios
    .get("https://quran.kemenag.go.id/api/v1/surat/0/114")
    .then((res) => res.data.data);
};

const getAyahs = async (numberSurah) => {
  try {
    await delay(1);
    const verse = await axios.get(
      `https://quran.kemenag.go.id/api/v1/ayatweb/${numberSurah}/0/0/10000/`
    );
    logSuccess(`AYAHS: surah ${numberSurah} SUCCESS!`);
    return verse.data.data;
  } catch (error) {
    logError(`AYAHS: surah ${numberSurah} FAIL!`);
    logInfo(`AYAHS: surah ${numberSurah} RE-CRAWL!`);
    await delay(2);
    return getAyahs(numberSurah);
  }
};

const main = async () => {
  const surahs = await getListSurah();

  for (const surah of surahs) {
    const ayahs = await getAyahs(surah.id);
    surahs[surah.id - 1].ayahs = ayahs;
  }

  await fs.writeFile(
    pathToData("tmp", "surah-kemenag.json"),
    JSON.stringify(surahs)
  );
  logSuccess("Everything is DONE!");
};

main();
