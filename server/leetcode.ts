import { LeetCode, Credential, RecentSubmission } from "leetcode-query";

let prev_submissions: RecentSubmission[] = [];

export const initLeetCode = async () => {
  const credential = new Credential();
  return new LeetCode(credential);
};

export const getRecentSubmissions = async (leetcode: LeetCode) => {
  return await leetcode.recent_submissions("taimurshaikh");
};

export const getNewSubmissions = (submissions: RecentSubmission[]) => {
  let new_submissions: RecentSubmission[] = submissions;

  if (prev_submissions.length !== 0) {
    new_submissions = submissions.filter(
      (s) => !prev_submissions.some((ps) => ps.timestamp === s.timestamp)
    );
  }
  prev_submissions = submissions;
  return new_submissions;
};

export const getAcceptedSubmissions = (submissions: RecentSubmission[]) => {
  return submissions.filter((s) => s.statusDisplay === "Accepted");
};

export const removeDuplicateSubmissions = (
  submissions: RecentSubmission[]
): RecentSubmission[] => {
  const uniqueSubmissions: RecentSubmission[] = [];

  submissions.forEach((submission) => {
    const existingSubmission = uniqueSubmissions.find(
      (s) => s.titleSlug === submission.titleSlug
    );
    if (
      !existingSubmission ||
      parseInt(submission.timestamp) > parseInt(existingSubmission.timestamp)
    ) {
      if (existingSubmission) {
        uniqueSubmissions.splice(
          uniqueSubmissions.indexOf(existingSubmission),
          1
        );
      }
      uniqueSubmissions.push(submission);
    }
  });

  return uniqueSubmissions;
};

export const getProblemFromSubmission = async (
  leetcode: LeetCode,
  submission: RecentSubmission
) => {
  const problem = await leetcode.problem(submission.titleSlug);
  return problem;
};
