const fs = require("fs");
const { default: axios } = require("axios");
const {
  delay,
  cleanHtmlTag,
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

const getVerses = async (numberSurah) => {
  try {
    await delay(1);
    const verse = await axios.get(
      `https://quran.kemenag.go.id/api/v1/ayatweb/${numberSurah}/0/0/10000/`
    );
    logSuccess(`VERSES: surah ${numberSurah} SUCCESS!`);
    return verse.data.data;
  } catch (error) {
    logError(`VERSES: surah ${numberSurah} FAIL!`);
    logInfo(`VERSES: surah ${numberSurah} RE-CRAWL!`);
    await delay(4);
    return await getVerses(numberSurah);
  }
};

const getTafsir = async (numberAyah) => {
  try {
    await delay(2);
    const tafsir = await axios.get(
      `https://quran.kemenag.go.id/api/v1/tafsirbyayat/${numberAyah}`
    );
    logSuccess(`TAFSIR: ayah ${numberAyah} SUCCESS!`);
    return { short: tafsir.data.tafsir[0], long: tafsir.data.tafsir[1] };
  } catch (error) {
    logError(`TAFSIR: surah ${numberSurah} FAIL!`);
    logInfo(`TAFSIR: surah ${numberSurah} RE-CRAWL!`);
    await delay(4);
    return await getTafsir(numberAyah);
  }
};

const scrapeKemenag = async () => {
  const surahs = await getListSurah();
  for (const surah of surahs) {
    const verses = await getVerses(surah.id);
    surahs[surah.id - 1].verses = verses;
    let ayahId = 1;
    while (ayahId <= surah.count_ayat) {
      const tafsir = await getTafsir(ayahId);
      surahs[surah.id - 1].verses[ayahId - 1].tafsir = {
        short: {
          ...tafsir.short,
          text: cleanHtmlTag(tafsir.short.text),
        },
        long: {
          ...tafsir.long,
          text: cleanHtmlTag(tafsir.long.text),
        },
      };
      ayahId++;
    }
  }
  return surahs;
};

const main = async () => {
  const quran = await scrapeKemenag();
  fs.writeFileSync(
    pathToData("tmp", "quran-kemenag.json"),
    JSON.stringify({ data: quran })
  );
  logSuccess("Everything is DONE!");
};

main();
