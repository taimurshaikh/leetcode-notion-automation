import { LeetCode, Credential } from "leetcode-query";

export const initLeetCode = async (cookie: string | undefined) => {
  const credential = new Credential();
  await credential.init(cookie);
  return new LeetCode(credential);
};

export const getRecentSubmissions = async (leetcode: LeetCode) => {
  return await leetcode.submissions({ limit: 10, offset: 0 });
};
