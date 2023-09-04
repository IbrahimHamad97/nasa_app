const request = require("supertest");
const app = require("../../app");
const { getDataFromFile } = require("../../models/planets.model");
const { mongoConnect, disconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await getDataFromFile();
  });

  afterAll(async () => {
    await disconnect();
  });

  describe("Test GET /launches", () => {
    test("It should return status 200", async () => {
      await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // expect(res.statusCode).toBe(200);
    });
  });

  describe("Test POST /launches", () => {
    let allData = {
      launchDate: "December 12, 2028",
      mission: "Test 2",
      rocket: "RB-26",
      target: "Kepler-1649 b",
    };
    const withoutDate = {
      mission: "Test 2",
      rocket: "RB-26",
      target: "Kepler-1649 b",
    };

    test("It should return status 201", async () => {
      const res = await request(app)
        .post("/v1/launches")
        .send(allData)
        .expect("Content-Type", /json/)
        .expect(201);

      const sentDate = new Date(allData.launchDate).valueOf();
      const backDate = new Date(res.body.launchDate).valueOf();

      expect(backDate).toBe(sentDate);
      expect(res.body).toMatchObject(withoutDate);
    });

    test("It should catch missing required properties", async () => {
      const res = await request(app)
        .post("/v1/launches")
        .send(withoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(res.body).toStrictEqual({ error: "Missing Mission Information" });
    });

    test("It should catch invalid date", async () => {
      allData.launchDate = "Wrong Format!";
      const res = await request(app)
        .post("/v1/launches")
        .send(allData)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(res.body).toStrictEqual({ error: "Invalid Date" });
    });
  });
});
