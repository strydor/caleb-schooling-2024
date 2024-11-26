/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateHighScore = /* GraphQL */ `
  subscription OnCreateHighScore(
    $filter: ModelSubscriptionHighScoreFilterInput
  ) {
    onCreateHighScore(filter: $filter) {
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
export const onUpdateHighScore = /* GraphQL */ `
  subscription OnUpdateHighScore(
    $filter: ModelSubscriptionHighScoreFilterInput
  ) {
    onUpdateHighScore(filter: $filter) {
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
export const onDeleteHighScore = /* GraphQL */ `
  subscription OnDeleteHighScore(
    $filter: ModelSubscriptionHighScoreFilterInput
  ) {
    onDeleteHighScore(filter: $filter) {
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
export const onCreateSynonymPair = /* GraphQL */ `
  subscription OnCreateSynonymPair(
    $filter: ModelSubscriptionSynonymPairFilterInput
  ) {
    onCreateSynonymPair(filter: $filter) {
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
export const onUpdateSynonymPair = /* GraphQL */ `
  subscription OnUpdateSynonymPair(
    $filter: ModelSubscriptionSynonymPairFilterInput
  ) {
    onUpdateSynonymPair(filter: $filter) {
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
export const onDeleteSynonymPair = /* GraphQL */ `
  subscription OnDeleteSynonymPair(
    $filter: ModelSubscriptionSynonymPairFilterInput
  ) {
    onDeleteSynonymPair(filter: $filter) {
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
