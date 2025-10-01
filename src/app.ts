import express from "express";
 const app = express();

// Importing morgan
import morgan from "morgan";

// Use morgan for HTTP request logging
app.use(morgan("combined"));
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

export default app;