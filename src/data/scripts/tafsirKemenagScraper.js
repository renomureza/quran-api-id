const fs = require("fs/promises");
const { default: axios } = require("axios");
const {
  logSuccess,
  logInfo,
  logError,
  delay,
  pathToData,
} = require("../../utils/utility");

const getTafsir = async (numberAyah) => {
  try {
    await delay(2);
    const tafsir = await axios.get(
      `https://quran.kemenag.go.id/api/v1/tafsirbyayat/${numberAyah}`
    );
    logSuccess(`TAFSIR: ayah ${numberAyah} SUCCESS!`);
    return { short: tafsir.data.tafsir[0], long: tafsir.data.tafsir[1] };
  } catch (error) {
    logError(`TAFSIR: ayah ${numberAyah} FAIL!`);
    logInfo(`TAFSIR: ayah ${numberAyah} RE-CRAWL!`);
    await delay(2);
    return await getTafsir(numberAyah);
  }
};

const main = async () => {
  const tafsirs = [];

  for (let i = 1; i <= 6236; i++) {
    const tafsir = await getTafsir(i);
    tafsirs.push(tafsir);
  }

  await fs.writeFile(
    pathToData("tmp", "tafsir-kemenag.json"),
    JSON.stringify(tafsirs)
  );
};

main();
