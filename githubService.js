import axios from "axios";

// Fetch the list of repositories for the user
export const listRepositories = async (octokit) => {
  const repos = await octokit.repos.listForAuthenticatedUser();
  return repos.data.map((repo) => ({
    name: repo.name,
    size: repo.size,
    owner: repo.owner.login,
  }));
};

const recursiveGetRepoFiles = async (octokit, owner, repo, path) => {
  const files = [];

  // get all files and folders in the current directory
  const { data: contents } = await octokit.repos.getContent({
    owner,
    repo,
    path,
  });

  // add all files to an array
  files.push(...contents.filter((item) => item.type === "file"));

  const directories = contents.filter((item) => item.type === "dir");

  // recursive fetch all files from each sub dir and add to the array
  const subFiles = await Promise.all(
    directories.map((dir) =>
      recursiveGetRepoFiles(octokit, owner, repo, dir.path)
    )
  );
  files.push(...subFiles.flat());
  return files;
};

// Fetch detailed information for a specific repository
export const getRepositoryDetails = async (octokit, repoName) => {
  const currentUser = (await octokit.rest.users.getAuthenticated()).data.login;

  const repoPromise = octokit.repos.get({ owner: currentUser, repo: repoName });

  const webhooksPromise = octokit.repos.listWebhooks({
    owner: currentUser,
    repo: repoName,
  });

  const repoFiles = await recursiveGetRepoFiles(octokit, currentUser, repoName);
  const ymlFile = repoFiles.find((file) => file.name.endsWith(".yml"));
  const ymlContent = ymlFile
    ? (await axios.get(ymlFile.download_url)).data
    : null;

  const [repo, webhooks] = await Promise.all([repoPromise, webhooksPromise]);

  return {
    name: repo.data.name,
    size: repo.data.size,
    owner: repo.data.owner.login,
    visibility: repo.data.private ? "Private" : "Public",
    numberOfFiles: repoFiles.length,
    ymlContent,
    activeWebhooks: webhooks.data.map((hook) => ({
      id: hook.id,
      url: hook.config.url,
    })),
  };
};
