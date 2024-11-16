const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

describe("Auth routes", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should not register a user with missing fields", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "hello@gmail.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "",
    });

    expect(response.statusCode).toBe(400);
  });

  it("should not register a user with mismatched passwords", async () => {
    const responsee = await request(app).post("/auth/register").send({
      email: "hello@gmail.com",
      password: "Password123!",
      confirmPassword: "Password123",
      firstName: "Test",
      lastName: "User",
    });

    expect(responsee.statusCode).toBe(400);
  });

  it("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "hello@gmail.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "Test",
      lastName: "User",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });

  it("should not register a user with an existing email", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "hello@gmail.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "Test",
      lastName: "User",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Email already exists");
  });

  it("should not login a user with invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "hello@gmail.com",
      password: "Password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should login a user with valid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "hello@gmail.com",
      password: "Password123!",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });
});
