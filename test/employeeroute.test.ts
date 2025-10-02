import request from "supertest";
import app from "../src/app";

describe("Employee API Endpoints", () => {
  let employeeId: number;

  // 1️⃣ Create Employee - success
  it("should create an employee successfully", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "John Doe",
      position: "Software Engineer",
      department: "IT",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      branchId: 1,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("John Doe");
    employeeId = res.body.id;
  });})