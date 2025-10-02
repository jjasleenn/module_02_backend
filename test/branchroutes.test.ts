import request from "supertest";
import app from "../src/app";

describe("Branch API Endpoints", () => {
  let branchId: string;

  // 1️ Create Branch - success
  it("should create a branch successfully", async () => {
    const res = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "Downtown Branch",
        address: "123 Main St, Cityville",
        phone: "123-456-7890"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Downtown Branch");
    branchId = res.body.id;
  });
  // 2️ Create Employee - missing params
  it("should return 400 when creating an employee with missing fields", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "Jane Doe",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Missing required fields");
  });})
