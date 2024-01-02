import { Client } from "@notionhq/client";
import { LeetCode, RecentSubmission, Submission } from "leetcode-query";
import { getProblemFromSubmission } from "./leetcode";
import { get } from "http";

const difficulty_map: { [key: string]: string } = {
  Easy: "green",
  Medium: "orange",
  Hard: "red",
};

export const initNotion = () => {
  const conn = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  return conn;
};

const updateDatabaseWithSubmission = async (
  notion: Client,
  notion_database_id: string,
  lc: LeetCode,
  submission: RecentSubmission
) => {
  const problem = await getProblemFromSubmission(lc, submission);

  const response = await notion.pages.create({
    parent: {
      database_id: notion_database_id ?? "",
    },
    properties: {
      "Problem Number": {
        type: "number",
        number: parseInt(problem.questionFrontendId),
      },
      "Problem Name": {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: problem.title,
            },
          },
        ],
      },
      Topics: {
        type: "multi_select",
        multi_select: problem.topicTags.map((tag) => {
          return {
            name: tag.name,
          };
        }),
      },

      // ...
      Difficulty: {
        type: "select",
        select: {
          name: problem.difficulty,
          color: "orange",
        },
      },
      Link: {
        type: "url",
        url: `https://leetcode.com/problems/${problem.titleSlug}/`,
      },
      Status: {
        type: "select",
        select: {
          name: "Done",
          color: "green",
        },
      },
      Date: {
        type: "date",
        date: {
          start: new Date(parseInt(submission.timestamp) * 1000).toISOString(),
        },
      },
    },
  });
};

export const updateDatabaseWithSubmissions = async (
  notion: Client,
  lc: LeetCode,
  submissions: RecentSubmission[]
) => {
  for (const submission of submissions) {
    await updateDatabaseWithSubmission(
      notion,
      process.env.NOTION_DATABASE_ID ?? "",
      lc,
      submission
    );
  }
};

export const getDatabaseEntriesByProblemNumber = async (
  notion: Client,
  database_id: string,
  problem_number: number
) => {
  const response = await notion.databases.query({
    database_id: database_id,
    filter: {
      property: "Problem Number",
      number: {
        equals: problem_number,
      },
    },
  });
  return response.results;
};

export const removeAlreadySubmittedProblems = async (
  notion: Client,
  lc: LeetCode,
  database_id: string,
  submissions: RecentSubmission[]
) => {
  const new_submissions: RecentSubmission[] = [];
  for (const submission of submissions) {
    const entries = await getDatabaseEntriesByProblemNumber(
      notion,
      database_id,
      parseInt(
        (
          await getProblemFromSubmission(lc, submission)
        ).questionFrontendId
      )
    );
    if (entries.length === 0) {
      new_submissions.push(submission);
    }
  }
  return new_submissions;
};
