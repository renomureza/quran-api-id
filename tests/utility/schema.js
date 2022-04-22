const audioObj = {
  alafasy: expect.any(String),
  ahmedajamy: expect.any(String),
  husarymujawwad: expect.any(String),
  minshawi: expect.any(String),
  muhammadayyoub: expect.any(String),
  muhammadjibreel: expect.any(String),
};

const singleSurah = {
  number: {
    inQuran: expect.any(Number),
    inSurah: expect.any(Number),
  },
  arab: expect.any(String),
  translation: expect.any(String),
  audio: audioObj,
  image: {
    primary: expect.any(String),
    secondary: expect.any(String),
  },
  tafsir: {
    kemenag: {
      short: expect.any(String),
      long: expect.any(String),
    },
    quraish: expect.any(String),
    jalalayn: expect.any(String),
  },
  meta: {
    juz: expect.any(Number),
    page: expect.any(Number),
    manzil: expect.any(Number),
    ruku: expect.any(Number),
    hizbQuarter: expect.any(Number),
    sajda: {
      recommended: expect.any(Boolean),
      obligatory: expect.any(Boolean),
    },
  },
};

module.exports = { audioObj, singleSurah };
