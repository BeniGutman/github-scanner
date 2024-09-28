# GitHub Scanner System

## Features

- **List Repositories**: Retrieve the repository name, size, and owner.
- **Repository Details**: Retrieve detailed information such as repo privacy, number of files, content of a `.yml` file, and active webhooks.
- **Concurrency Control**: Limit scanning of repositories to a maximum of 2 in parallel.

## Technologies Used

- **Apollo GraphQL**: A GraphQL server to handle queries.
- **Octokit**: GitHub REST API client for JavaScript to fetch repository data.
- **Node.js**: Backend development framework.

## Setup

### Installation

1. **Clone This Project**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/BeniGutman/github-scanner.git
   cd github-scanner
   ```

2. **Install Dependencies**

   Install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Start the Server**

   To start the Apollo GraphQL server:

   ```bash
   npm start
   ```

   This will start the server at `http://localhost:4000`.

## Usage

### GraphQL Endpoints

Once the server is running, you can query the following endpoints using a GraphQL client (e.g., Postman, Apollo Studio).

#### List Repositories

This query retrieves a list of repositories (name, size, owner) for a given GitHub developer token.

```graphql
query {
  listRepositories(token: "your-github-token") {
    name
    size
    owner
  }
}
```

#### Repository Details

This query retrieves detailed information about a specific repository, including name, size, owner, whether it is private or public, number of files, a `.yml` file content, and active webhooks.

```graphql
query {
  getRepositoriesDetails(
    token: "your-github-token"
    repoNames: ["repoA", "repoB", "repoC"]
  ) {
    name
    size
    owner
    visibility
    numberOfFiles
    ymlContent
    activeWebhooks {
      id
      url
    }
  }
}
```

## Notes

1. Make sure your code adheres to clean code principles and is properly structured.
2. The system is designed to limit parallel scans to a maximum of 2 repositories at the same time.

## License

This project is open-source under the MIT License.
