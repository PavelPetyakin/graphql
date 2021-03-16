import { ApolloServer } from 'apollo-server';
import { Client } from 'pg';
import { schema } from './types/shcema';

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "",
  password: "",
  database: "graphql",
});

// Проверка токена
// const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);

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
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      playground: true,
    });
    const { url } = await server.listen({
      port: 4005,
      endpoint: '/api',
      playground: '/graphql'
    });
    console.log(`🚀  Server ready at ${url}graphql`);
  } catch (e) {
    console.error("Server don't started", e);
  }
})();
