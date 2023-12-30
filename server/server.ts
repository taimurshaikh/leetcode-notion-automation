// server/server.ts
import express from "express";
import { getRecentSubmissions, initLeetCode } from "./leetcode";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5050;

app.get("/api", async (req, res) => {
  const lc = await initLeetCode(process.env.LEETCODE_SESSION_COOKIE);
  const submissions = await getRecentSubmissions(lc);
  res.send(JSON.stringify(submissions));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
