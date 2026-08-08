import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import pool from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

// CORS
app.use(
  cors({
    origin: "http://49.149.184.65/",
    credentials: true,
  }),
);

// Parse JSON
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running",
  });
});

app.get("/db-test", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT 1 AS connected");

    res.json({
      success: true,
      database: "Connected",
      result,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      database: "Not connected",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
