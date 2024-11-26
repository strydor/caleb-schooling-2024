/* eslint-disable */
// this is an auto generated file. This will be overwritten

const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;

const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

const getHighScore = /* GraphQL */ `
  query GetHighScore($id: ID!) {
    getHighScore(id: $id) {
      id
      name
      score
      date
      createdAt
      updatedAt
      __typename
    }
  }
`;

const listHighScores = /* GraphQL */ `
  query ListHighScores(
    $filter: ModelHighScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHighScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        score
        date
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

const getSynonymPair = /* GraphQL */ `
  query GetSynonymPair($id: ID!) {
    getSynonymPair(id: $id) {
      id
      word1
      word2
      difficulty
      createdAt
      updatedAt
      __typename
    }
  }
`;

const listSynonymPairs = /* GraphQL */ `
  query ListSynonymPairs(
    $filter: ModelSynonymPairFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSynonymPairs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        word1
        word2
        difficulty
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

module.exports = {
  getTodo,
  listTodos,
  getHighScore,
  listHighScores,
  getSynonymPair,
  listSynonymPairs
};
