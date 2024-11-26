/* eslint-disable */
// this is an auto generated file. This will be overwritten

const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;

const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;

const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;

const createHighScore = /* GraphQL */ `
  mutation CreateHighScore(
    $input: CreateHighScoreInput!
    $condition: ModelHighScoreConditionInput
  ) {
    createHighScore(input: $input, condition: $condition) {
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

const updateHighScore = /* GraphQL */ `
  mutation UpdateHighScore(
    $input: UpdateHighScoreInput!
    $condition: ModelHighScoreConditionInput
  ) {
    updateHighScore(input: $input, condition: $condition) {
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

const deleteHighScore = /* GraphQL */ `
  mutation DeleteHighScore(
    $input: DeleteHighScoreInput!
    $condition: ModelHighScoreConditionInput
  ) {
    deleteHighScore(input: $input, condition: $condition) {
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

const createSynonymPair = /* GraphQL */ `
  mutation CreateSynonymPair(
    $input: CreateSynonymPairInput!
    $condition: ModelSynonymPairConditionInput
  ) {
    createSynonymPair(input: $input, condition: $condition) {
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

const updateSynonymPair = /* GraphQL */ `
  mutation UpdateSynonymPair(
    $input: UpdateSynonymPairInput!
    $condition: ModelSynonymPairConditionInput
  ) {
    updateSynonymPair(input: $input, condition: $condition) {
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

const deleteSynonymPair = /* GraphQL */ `
  mutation DeleteSynonymPair(
    $input: DeleteSynonymPairInput!
    $condition: ModelSynonymPairConditionInput
  ) {
    deleteSynonymPair(input: $input, condition: $condition) {
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

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  createHighScore,
  updateHighScore,
  deleteHighScore,
  createSynonymPair,
  updateSynonymPair,
  deleteSynonymPair
};
