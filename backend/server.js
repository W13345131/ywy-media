import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 每次请求时确保数据库已连接
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// 给 Vercel 导出 app，不要 listen
export default app;