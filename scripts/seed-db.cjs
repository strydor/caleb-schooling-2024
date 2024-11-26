const { Amplify } = require('aws-amplify');
const { generateClient } = require('@aws-amplify/api');
const mutations = require('../src/graphql/mutations.js');
const awsconfig = require('../src/aws-exports.js');

const { createSynonymPair } = mutations;

Amplify.configure(awsconfig);
const client = generateClient();

const synonymPairs = [
  // Basic emotions
  { word1: 'happy', word2: 'glad', difficulty: 1 },
  { word1: 'sad', word2: 'unhappy', difficulty: 1 },
  { word1: 'mad', word2: 'angry', difficulty: 1 },
  
  // Simple adjectives
  { word1: 'big', word2: 'large', difficulty: 1 },
  { word1: 'small', word2: 'tiny', difficulty: 1 },
  { word1: 'fast', word2: 'quick', difficulty: 1 },
  { word1: 'slow', word2: 'lazy', difficulty: 1 },
  
  // Common actions
  { word1: 'run', word2: 'sprint', difficulty: 1 },
  { word1: 'jump', word2: 'hop', difficulty: 1 },
  { word1: 'look', word2: 'see', difficulty: 1 },
  
  // Descriptions
  { word1: 'pretty', word2: 'beautiful', difficulty: 1 },
  { word1: 'cold', word2: 'chilly', difficulty: 1 },
  { word1: 'hot', word2: 'warm', difficulty: 1 },
  { word1: 'wet', word2: 'damp', difficulty: 1 },
  
  // Simple nouns
  { word1: 'house', word2: 'home', difficulty: 1 },
  { word1: 'car', word2: 'auto', difficulty: 1 },
  { word1: 'friend', word2: 'pal', difficulty: 1 },
  
  // Weather
  { word1: 'sunny', word2: 'bright', difficulty: 1 },
  { word1: 'rainy', word2: 'wet', difficulty: 1 },
  { word1: 'windy', word2: 'breezy', difficulty: 1 }
];

async function seedDatabase() {
  console.log('Starting database seeding...');
  
  for (const pair of synonymPairs) {
    try {
      const result = await client.graphql({
        query: createSynonymPair,
        variables: {
          input: pair
        }
      });
      console.log(`Created synonym pair: ${pair.word1} - ${pair.word2}`);
    } catch (error) {
      console.error(`Error creating synonym pair ${pair.word1} - ${pair.word2}:`, error);
    }
  }
  
  console.log('Database seeding completed!');
}

seedDatabase();
