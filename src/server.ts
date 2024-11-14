import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import resolvers from './resolvers';
import { glob } from 'glob';
import config from './lib/config/config';

async function main() {
  try {
    const typeDefs = glob.sync(resolve(__dirname, '**/*.graphql'))
      .map(file => readFileSync(file, { encoding: 'utf-8' }))
      .map(content => gql(content));

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    const { url } = await server.listen({ port: config.port });
    console.log(`Service ready at ${url}`);
  }
  catch (error) {
    console.error('Error starting the server:', error);
  }
}

main();