// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, HighScore, SynonymPair } = initSchema(schema);

export {
  Todo,
  HighScore,
  SynonymPair
};