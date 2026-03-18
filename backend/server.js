import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { Inngest } from "inngest";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const inngest = new Inngest({
  id: "ywy-media-test",
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [],
  })
);

export default app;