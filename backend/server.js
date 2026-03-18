import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { serve } from "inngest/express";
import { Inngest } from "inngest";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * ✅ MongoDB 连接（防重复连接）
 */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing");
  }

  await mongoose.connect(uri);
  isConnected = true;

  console.log("MongoDB connected");
}

/**
 * ✅ 每次请求前确保数据库连接
 */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

/**
 * ✅ 首页测试
 */
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

/**
 * ✅ Inngest client
 */
const inngest = new Inngest({
  id: "ywy-media",
});

/**
 * ✅ Inngest endpoint（关键）
 */
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [], // 👉 先空，确认能跑再加
  })
);

/**
 * ❗ 不要写 app.listen()
 */
export default app;