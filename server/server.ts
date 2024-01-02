import express from "express";
import * as leetcode from "./leetcode";
import * as notion from "./notion";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5050;

const notion_connection = notion.initNotion();
const lc_connection_promise = (async () => {
  const lc = await leetcode.initLeetCode();
  return lc;
})();

app.get("/update", async (req, res) => {
  const lc_connection = await lc_connection_promise;
  let submissions = await leetcode.getRecentSubmissions(lc_connection);
  submissions = leetcode.getNewSubmissions(submissions);
  submissions = leetcode.getAcceptedSubmissions(submissions);
  submissions = leetcode.removeDuplicateSubmissions(submissions);
  submissions = await notion.removeAlreadySubmittedProblems(
    notion_connection,
    lc_connection,
    process.env.NOTION_DATABASE_ID ?? "",
    submissions
  );

  notion.updateDatabaseWithSubmissions(
    notion_connection,
    lc_connection,
    submissions
  );

  res.json(submissions);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
