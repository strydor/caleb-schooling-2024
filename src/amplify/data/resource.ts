import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  HighScore: a
    .model({
      name: a.string(),
      score: a.integer(),
      date: a.datetime(),
    })
    .authorization([a.allow.public.read(), a.allow.public.create()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
