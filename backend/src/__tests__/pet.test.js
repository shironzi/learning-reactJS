const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

describe("Pet routes", () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const loginResponse = await request(app).post("/auth/login").send({
      email: "test@test.com",
      password: "Password123!",
    });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should not get pets without a token", async () => {
    const response = await request(app).get("/pets");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Not Authorized");
  });

  it("should get pets with a token", async () => {
    const response = await request(app)
      .get("/pets")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.pets).toBeDefined();
  });

  it("should get a pet by id", async () => {
    const response = await request(app)
      .get("/pets/67266cdf7462511a1afa4663")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
