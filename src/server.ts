import express from "express";
 
const app = express();
 
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});
 
export default app;
 
 