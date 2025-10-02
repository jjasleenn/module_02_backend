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
  });})