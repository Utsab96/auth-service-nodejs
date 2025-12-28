const request = require("supertest");
const app = require("../src/app");
const { pool } = require("../src/config/db");
const { v4: uuidv4 } = require("uuid");

let token;
let testEmail;
beforeAll(async () => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("❌ Tests must run in TEST environment only");
  }

  testEmail = `${uuidv4()}@example.com`;

  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

afterAll(async () => {
  await pool.end();
});

describe("Auth API Tests", () => {

  it("✅ should register a new user", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: testEmail,
      password: "password123"
    });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("token");
  expect(res.body.user).toMatchObject({
    name: "Test User",
    email: testEmail
  });
});

  it("✅ should login the user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testEmail,
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("✅ should get current user (protected route)", async () => {
  const res = await request(app)
    .get("/api/auth/me")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toMatchObject({
    name: "Test User",
    email: testEmail
  });
});

  it("❌ should block access without token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.statusCode).toBe(401);
  });

});
