const httpStatus = require("http-status");
const supertest = require("supertest");
const app = require("../../src/app");

describe("GET /", () => {
  test("should return a 200 status code", async () => {
    const request = await supertest(app).get("/");

    expect(request.status).toBe(httpStatus.OK);
  });

  test("should return a correct object", async () => {
    const request = await supertest(app).get("/");

    expect(request.body).toMatchObject({
      endpoints: expect.arrayContaining([
        expect.objectContaining({
          path: expect.any(String),
          description: expect.any(String),
        }),
      ]),
      maintainer: expect.any(String),
      source: expect.any(String),
    });
  });
});
