// server/server.ts
import express from "express";
import { getNewSubmissions, initLeetCode } from "./leetcode";
import { updateDatabaseWithSubmissions } from "./notion";
import { config } from "dotenv";

config();

const app = express();
const port = 5050;

app.get("/update", async (req, res) => {
  const lc = await initLeetCode();
  const submissions = await getNewSubmissions(lc);
  updateDatabaseWithSubmissions(lc, submissions);
  res.json(submissions);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
