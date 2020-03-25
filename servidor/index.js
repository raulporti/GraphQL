import express from 'express';
import { ApolloServer } from 'apollo-server-express';
const { loadFile } = require('graphql-import-files');
//import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
const app = express();
const server = new ApolloServer({typeDefs: loadFile ('data/schema.graphql'), resolvers});

server.applyMiddleware({app});
app.listen({port:8000}, () => console.log(`El servidor esta funcionando ${server.graphqlPath}`));