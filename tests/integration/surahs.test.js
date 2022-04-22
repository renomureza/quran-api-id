const supertest = require("supertest");
const httpStatus = require("http-status");
const app = require("../../src/app");
const { audioObj, singleSurah } = require("../utility/schema");

describe("GET /surahs", () => {
  test("should return a 200 status code", async () => {
    const request = await supertest(app).get("/surahs");

    expect(request.status).toBe(httpStatus.OK);
  });

  test("should return correct array of object", async () => {
    const request = await supertest(app).get("/surahs");

    expect(request.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          number: expect.any(Number),
          numberOfAyahs: expect.any(Number),
          audio: expect.any(String),
          description: expect.any(String),
          name: expect.any(String),
          revelation: expect.any(String),
          translation: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /surahs/:surahNumber", () => {
  describe("when surah is exists", () => {
    test("should return a 200 status code", async () => {
      const request = await supertest(app).get("/surahs/2");

      expect(request.status).toBe(httpStatus.OK);
    });

    test("should return correct object", async () => {
      const request = await supertest(app).get("/surahs/2");

      expect(request.body).toMatchObject({
        number: expect.any(Number),
        numberOfAyahs: expect.any(Number),
        name: expect.any(String),
        translation: expect.any(String),
        revelation: expect.any(String),
        description: expect.any(String),
        audio: expect.any(String),
        bismillah: {
          arab: expect.any(String),
          translation: expect.any(String),
          audio: audioObj,
        },
        ayahs: expect.arrayContaining([expect.objectContaining(singleSurah)]),
      });
    });
  });

  describe("when surah not exists", () => {
    test("should return a 404 status code", async () => {
      const request = await supertest(app).get("/surahs/115");

      expect(request.status).toBe(httpStatus.NOT_FOUND);
    });

    test("should return correct object", async () => {
      const request = await supertest(app).get("/surahs/115");

      expect(request.body).toMatchObject({
        code: expect.any(Number),
        message: expect.any(String),
      });
    });
  });
});

describe("GET /surahs/:surahNumber/ayahs", () => {
  test("should return a 200 status code", async () => {
    const request = await supertest(app).get("/surahs/1/ayahs");

    expect(request.status).toBe(httpStatus.OK);
  });

  test("should return correct object", async () => {
    const request = await supertest(app).get("/surahs/1/ayahs");

    expect(request.body).toEqual(
      expect.arrayContaining([expect.objectContaining(singleSurah)])
    );
  });
});

describe("GET /surahs/:surahNumber/ayahs/:ayahNumber", () => {
  describe("when ayah is exists", () => {
    test("should return a 200 status code", async () => {
      const request = await supertest(app).get("/surahs/2/ayahs/1");

      expect(request.status).toBe(httpStatus.OK);
    });

    test("should return correct object", async () => {
      const request = await supertest(app).get("/surahs/2/ayahs/1");

      expect(request.body).toMatchObject(singleSurah);
    });
  });

  describe("when ayah not exists", () => {
    test("should return a 404 status code", async () => {
      const request = await supertest(app).get("/surahs/2/ayahs/1000");

      expect(request.status).toBe(httpStatus.NOT_FOUND);
    });

    test("should return correct object", async () => {
      const request = await supertest(app).get("/surahs/2/ayahs/1000");

      expect(request.body).toMatchObject({
        code: expect.any(Number),
        message: expect.any(String),
      });
    });
  });
});
