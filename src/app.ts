import express from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeroutes";
import branchRoutes from "./api/v1/routes/branchroutes";
import dotenv from "dotenv";
import { gethelmetconfig } from "../config/helmetconfig";
import cors from "cors";
import { getCorsOptions } from "../config/cors";
import {publicCorsOptions,authenticatedCorsOptions,} from "../config/corsoption";
import setupSwagger from "../config/swagger";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

app.use(gethelmetconfig());

app.use(cors(getCorsOptions()));


// Health check route
app.get("/", (req, res) => {
  res.status(200).send("Server is healthy");
});

// API routes
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

// Public endpoints — relaxed CORS
app.use("/api/v1/health", cors(publicCorsOptions));
app.use("/api-docs", cors(publicCorsOptions));

//Authenticated endpoints — strict CORS
app.use("/api/v1/users", cors(authenticatedCorsOptions));
app.use("/api/v1/admin", cors(authenticatedCorsOptions));

setupSwagger(app);

export default app;

