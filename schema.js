import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    listRepositories(token: String!): [Repository]
    getRepositoriesDetails(token: String!, repoNames: [String!]): [RepoDetails]
  }

  type Repository {
    name: String
    size: Int
    owner: String
  }

  type RepoDetails {
    name: String
    size: Int
    owner: String
    visibility: String
    numberOfFiles: Int
    ymlContent: String
    activeWebhooks: [Webhook]
  }

  type Webhook {
    id: String
    url: String
  }
`;
