import express from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeroutes";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// API routes
app.use("/api/v1/employees", employeeRoutes);

export default app;
