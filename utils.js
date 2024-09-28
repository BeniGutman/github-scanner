import pLimit from "p-limit";
import { Octokit } from "@octokit/rest";
import { PARALLEL_REPO_SCAN_LIMIT } from "./consts.js";

// Use the limit to control parallel repo scanning
export const limitParallelRequests = async (promises) => {
  const limit = pLimit(PARALLEL_REPO_SCAN_LIMIT);
  const limitedPromises = promises.map((promise) => limit(promise));
  return await Promise.all(limitedPromises);
};

export const getOctokit = (token) =>
  new Octokit({
    auth: token,
  });
