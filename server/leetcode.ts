import { LeetCode, Credential, RecentSubmission } from "leetcode-query";

let prev_submissions: RecentSubmission[] = [];

export const initLeetCode = async () => {
  const credential = new Credential();
  return new LeetCode(credential);
};

const getRecentSubmissions = async (leetcode: LeetCode) => {
  return await leetcode.recent_submissions("taimurshaikh");
};

export const getNewSubmissions = async (leetcode: LeetCode) => {
  const submissions = await getRecentSubmissions(leetcode);
  let new_submissions: RecentSubmission[] = submissions;

  if (prev_submissions.length !== 0) {
    new_submissions = submissions.filter(
      (s) => !prev_submissions.some((ps) => ps.timestamp === s.timestamp)
    );
  }
  prev_submissions = submissions;
  return new_submissions;
};

export const getProblemFromSubmission = async (
  leetcode: LeetCode,
  submission: RecentSubmission
) => {
  const problem = await leetcode.problem(submission.titleSlug);
  return problem;
};
