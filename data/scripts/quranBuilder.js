const fs = require("fs");
const { default: axios } = require("axios");
const { data: quranKemenag } = require("../tmp/quran-kemenag.json");
const tafsirQuraish = require("../tmp/tafsir-quraish.json");
const tafsirJalalayn = require("../tmp/tafsir-jalalayn.json");
const { pathToData, cleanHtmlTag } = require("../../utils/utility");

const httpToHttps = (str = "") => str.replace("http", "https");

const getTafsirQuraish = (numberSurah, numberAyah) => {
  return tafsirQuraish[`${numberSurah}.${numberAyah}`];
};

const getTafsirJalalayn = (numberSurah, numberAyah) => {
  return tafsirJalalayn[`${numberSurah}.${numberAyah}`];
};

const getSurahsQuranCloud = () => {
  return axios
    .get("https://api.alquran.cloud/v1/quran/quran-uthmani")
    .then(({ data }) => data.data.surahs);
};

const getAudioAndDescriptionSurahs = () => {
  return axios
    .get("https://al-quran-8d642.firebaseio.com/data.json")
    .then(({ data }) => data);
};

const getAudioPerAyah = (numberAyahInQuran) => {
  return {
    alafasy: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${numberAyahInQuran}.mp3`,
    ahmedajamy: `https://cdn.islamic.network/quran/audio/128/ar.ahmedajamy/${numberAyahInQuran}.mp3`,
    husarymujawwad: `https://cdn.islamic.network/quran/audio/128/ar.husarymujawwad/${numberAyahInQuran}.mp3`,
    minshawi: `https://cdn.islamic.network/quran/audio/128/ar.minshawi/${numberAyahInQuran}.mp3`,
    muhammadayyoub: `https://cdn.islamic.network/quran/audio/128/ar.muhammadayyoub/${numberAyahInQuran}.mp3`,
    muhammadjibreel: `https://cdn.islamic.network/quran/audio/128/ar.muhammadjibreel/${numberAyahInQuran}.mp3`,
  };
};

const getImageAyah = (numberSurah, numberAyah) => {
  return {
    primary: `https://cdn.islamic.network/quran/images/${numberSurah}_${numberAyah}.png`,
    secondary: `https://cdn.alquran.cloud/media/image/${numberSurah}/${numberAyah}`,
  };
};

const getBismillah = () => {
  const { aya_text, translation_aya_text } = quranKemenag[0].verses[0];
  return {
    arab: aya_text,
    translation: translation_aya_text,
    audio: getAudioPerAyah(1),
  };
};

const revelationEnToId = (revelation) => {
  const revelations = { Meccan: "Makkiyah", Medinan: "Madaniyah" };
  return revelations[revelation];
};

const sajdaTransformer = (sajda) => ({
  recommended: sajda?.recommended ?? false,
  obligatory: sajda?.obligatory ?? false,
});

const metaTransformer = (surah) => {
  return {
    juz: surah.juz,
    page: surah.page,
    manzil: surah.manzil,
    ruku: surah.ruku,
    hizbQuarter: surah.hizbQuarter,
    sajda: sajdaTransformer(surah.sajda),
  };
};

const ayahTransformer = (numberSurah, surahsFromQuranCloud) => {
  return (ayah, ayahIdx) => ({
    number: {
      inQuran: ayah.aya_id,
      inSurah: ayah.aya_number,
    },
    arab: ayah.aya_text,
    translation: ayah.translation_aya_text,
    audio: getAudioPerAyah(ayah.aya_id),
    image: getImageAyah(numberSurah, ayah.aya_number),
    tafsir: {
      kemenag: {
        short: ayah.tafsir.short.text,
        long: ayah.tafsir.long.text,
      },
      quraish: getTafsirQuraish(numberSurah, ayah.aya_number),
      jalalayn: getTafsirJalalayn(numberSurah, ayah.aya_number),
    },
    meta: metaTransformer(surahsFromQuranCloud[numberSurah - 1].ayahs[ayahIdx]),
  });
};

const surahTransformer = (surahsQuranCloud, surahsAudioAndDescription) => {
  return (surah, surahIdx) => ({
    number: surah.id,
    numberOfAyahs: surah.count_ayat,
    name: surah.surat_name,
    translation: surah.surat_terjemahan,
    revalation: revelationEnToId(surahsQuranCloud[surahIdx].revelationType),
    description: cleanHtmlTag(surahsAudioAndDescription[surahIdx].keterangan),
    audio: httpToHttps(surahsAudioAndDescription[surahIdx].audio),
    bismillah: getBismillah(),
    ayahs: surah.verses.map(ayahTransformer(surah.id, surahsQuranCloud)),
  });
};

const quranDataBuilder = async () => {
  const surahsQuranCloud = await getSurahsQuranCloud();
  const surahsAudioAndDescription = await getAudioAndDescriptionSurahs();
  return quranKemenag.map(
    surahTransformer(surahsQuranCloud, surahsAudioAndDescription)
  );
};

const main = async () => {
  const quran = await quranDataBuilder();
  fs.writeFileSync(pathToData("quran.json"), JSON.stringify(quran));
};

main();
