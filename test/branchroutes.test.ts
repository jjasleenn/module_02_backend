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

  // 2️ Create Branch - missing params
  it("should return 400 when creating a branch with missing parameters", async () => {
    const res = await request(app)
      .post("/api/v1/branches")
      .send({
        // Missing name
        address: "456 Elm St"
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Missing required fields");
  });

  // 3️ Get All Branches - success
  it("should get all branches", async () => {
    const res = await request(app).get("/api/v1/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  // 4️ Get Branch by ID - success
  it("should get a branch by ID", async () => {
    const res = await request(app).get(`/api/v1/branches/${branchId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(branchId);
  });

  // 5️ Get Branch by ID - invalid ID
  it("should return 404 for a non-existent branch ID", async () => {
    const res = await request(app).get("/api/v1/branches/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Branch not found");
  });

  // 6️ Update Branch - success
  it("should update a branch successfully", async () => {
    const res = await request(app)
      .put(`/api/v1/branches/${branchId}`)
      .send({ phone: "987-654-3210" });

    expect(res.status).toBe(200);
    expect(res.body.phone).toBe("987-654-3210");
  });

  // 7️ Update Branch - missing params
  it("should return 400 when updating a branch with no data", async () => {
    const res = await request(app)
      .put(`/api/v1/branches/${branchId}`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "No update data provided");
  });

  // 8️ Update Branch - invalid ID
  it("should return 404 when updating a non-existent branch", async () => {
    const res = await request(app)
      .put("/api/v1/branches/99999")
      .send({ phone: "000-000-0000" });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Branch not found");
  });

  // 9️ Delete Branch - success
  it("should delete a branch successfully", async () => {
    const res = await request(app).delete(`/api/v1/branches/${branchId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Branch deleted successfully");
  });

  // 10 Delete Branch - invalid ID
  it("should return 404 when deleting a non-existent branch", async () => {
    const res = await request(app).delete("/api/v1/branches/99999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Branch not found");
  });
});
