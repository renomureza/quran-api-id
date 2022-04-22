const supertest = require("supertest");
const httpStatus = require("http-status");
const app = require("../../src/app");
const { singleSurah } = require("../utility/schema");

describe("GET /random", () => {
  describe("when getting random", () => {
    test("should return a 200 status code", async () => {
      const request = await supertest(app).get("/random");

      expect(request.status).toBe(httpStatus.OK);
    });

    test("should return correct object", async () => {
      const request = await supertest(app).get("/random");

      expect(request.body).toMatchObject(singleSurah);
    });
  });
});
