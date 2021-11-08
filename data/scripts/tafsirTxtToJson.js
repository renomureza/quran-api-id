const fs = require("fs");
const { pathToData } = require("../../utils/utility");

const pathToTmp = (fileName) => pathToData("tmp", fileName);
const readFileAndToString = (path) => fs.readFileSync(path).toString();
const splitByNewLine = (value) => value.split("\n");

const transformLinesToObj = (lines) => {
  const tmp = {};
  for (const line of lines) {
    const [numberSurah, numberAyah, tafsir] = line.split("|");
    tmp[`${numberSurah}.${numberAyah}`] = tafsir;
  }
  return tmp;
};

const transformTxtToJson = (txtPath) => {
  return JSON.stringify(
    transformLinesToObj(splitByNewLine(readFileAndToString(txtPath)))
  );
};

const main = (paths = []) => {
  paths.forEach((path) => {
    fs.writeFileSync(path.json, transformTxtToJson(path.txt));
  });
};

const paths = [
  {
    txt: pathToTmp("tafsir-jalalayn.txt"),
    json: pathToTmp("tafsir-jalalayn.json"),
  },
  {
    txt: pathToTmp("tafsir-quraish.txt"),
    json: pathToTmp("tafsir-quraish.json"),
  },
];

main(paths);
