import { ApolloServer } from 'apollo-server';
import { loadFiles } from 'graphql-tools';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { resolvers } from './types/resolvers';
import { Client } from 'pg';
import { query } from './types/person/pesrson';

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "",
  password: "",
  database: "graphql",
});

const schema = new GraphQLSchema({
  query: query
});

// @ts-ignore
// const typeDefs = await loadFiles('./src/**/**/*.graphql');

// const auth = async ({ request }) => {
//   let user;
//   try {
//     user = await  getUserFromRequest(request);
//   } catch (e) {
//     throw new AuthenticationError('You provide incorrect token');
//   }
//   const hasRole = (role) => {
//     if (user && Array.isArray(user.roles)) {
//       return user.roles.includes(role);
//     }
//     return false;
//   }
//   return { request, user, hasRole };
// }

(async () => {
  try {
    await client.connect();
    const typeDefs = await loadFiles('./src/**/**/*.graphql');
    if(typeDefs !== undefined) {
      const server = new ApolloServer({
        schema,
//     context: ({ req }) => console.log('context', req),
        playground: true,
      });
      const { url } = await server.listen({
        port: 4005,
        endpoint: '/api',
        playground: '/graphql'
      });
      console.log(`🚀  Server ready at ${url}graphql`);
    }

  } catch (e) {
    console.error("Server don't started", e);
  }
})();
