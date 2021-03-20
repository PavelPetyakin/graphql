import { ApolloServer } from "apollo-server-express";
import express from "express";
import cookieParser from "cookie-parser";
import expressPlayground from "graphql-playground-middleware-express";
import { Client } from "pg";
import { schema } from "./types/shcema";
import { getUserFromRequest } from "./auth";
import { IPerson } from "./types/person";

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

// export type ContextFunction<FunctionParams = any, ProducedContext = object> = (
//   context: FunctionParams,
// ) => ValueOrPromise<Context<ProducedContext>>;

(async () => {
  try {
    const app = express();
    await client.connect();
    app.use(cookieParser());
    const server = new ApolloServer({
      schema,
      context: async (props) => {
        const { req, res } = props;
        const user: string | object | null = await getUserFromRequest(req);
        console.log("context", user);
        return { req, res }
      },
      playground: true,
    });

    server.applyMiddleware({ app });

    app.get("/playground", expressPlayground({ endpoint: "/graphql" }))
    app.listen({ port: 4005 }, () =>
      console.log(`GraphQL Server running 🚀 http://localhost:4005${server.graphqlPath}`)
    );
  } catch (e) {
    console.error("Server don't started", e);
  }
})();
