import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const { loadFile } = require('graphql-import-files');
//import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
const app = express();
const server = new ApolloServer({typeDefs: loadFile ('data/schema.graphql'), resolvers,
 context : async({req})=>{
   const token = req.headers['authorization'];
   if(token != "null") {
       try {
           //Verificar el token del frontend
            const usuarioActual = await jwt.verify(token, process.env.SECRETO); 
            //agregamos el usuario actual al request
            req.usuarioActual = usuarioActual;
            return {
                usuarioActual
            }
       } catch (error) {
           console.log(error);
       }
   } 
 }});

server.applyMiddleware({app});
app.listen({port:8000}, () => console.log(`El servidor esta funcionando http://localhost:8000${server.graphqlPath}`));