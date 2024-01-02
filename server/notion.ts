import { Client } from "@notionhq/client";
import { LeetCode, RecentSubmission, Submission } from "leetcode-query";
import { getProblemFromSubmission } from "./leetcode";

// const difficulty_map: { [key in ProblemDifficulty]: string } = {
//   Easy: green,
//   Medium: orange,
//   Hard: red,
// };

const updateDatabaseWithSubmission = async (
  lc: LeetCode,
  submission: RecentSubmission
) => {
  const problem = await getProblemFromSubmission(lc, submission);

  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const database_id = process.env.NOTION_DATABASE_ID;

  const response = await notion.pages.create({
    parent: {
      database_id: database_id ?? "",
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

      Difficulty: {
        type: "select",
        select: {
          name: problem.difficulty,
          color: "green",
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
      "Time Taken": {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: "0",
            },
          },
        ],
      },
      Date: {
        type: "date",
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  });
};

export const updateDatabaseWithSubmissions = async (
  lc: LeetCode,
  submissions: RecentSubmission[]
) => {
  for (const submission of submissions) {
    await updateDatabaseWithSubmission(lc, submission);
  }
};
