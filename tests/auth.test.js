const request = require("supertest");
const app = require("../src/app");
const { pool } = require("../src/config/db");

let token;
let testEmail = `test${Date.now()}@example.com`;

afterAll(async () => {
  await pool.end(); // close DB connection
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
    expect(res.body.user.email).toBe(testEmail);
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
    expect(res.body.email).toBe(testEmail);
  });

  it("❌ should block access without token", async () => {
    const res = await request(app)
      .get("/api/auth/me");

    expect(res.statusCode).toBe(401);
  });

});
