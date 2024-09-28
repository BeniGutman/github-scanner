import { getOctokit, limitParallelRequests } from "./utils.js";
import { listRepositories, getRepositoryDetails } from "./githubService.js";

export const resolvers = {
  Query: {
    listRepositories: async (_, { token }) => {
      const octokit = getOctokit(token);
      return await listRepositories(octokit);
    },
    getRepositoriesDetails: async (_, { token, repoNames }) => {
      const octokit = getOctokit(token);
      return await limitParallelRequests(
        repoNames.map(
          (repoName) => () => getRepositoryDetails(octokit, repoName)
        )
      );
    },
  },
};
