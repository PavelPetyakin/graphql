import { ApolloServer } from "apollo-server-express";
import express from "express";
import cookieParser from "cookie-parser";
import expressPlayground from "graphql-playground-middleware-express";
import { Client } from "pg";
import { schema } from "./types/shcema";
import { getUserFromRequest } from "./auth";
import { IPerson } from "./types/person";
import { Roles } from "./types/person/types";

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "",
  password: "",
  database: "graphql",
});

(async () => {
  try {
    const server = new ApolloServer({
      schema,
      context: async ({ req, res }) => {
        let user: IPerson | null;
        try {
          user = await getUserFromRequest({ req, res });
        } catch (e) {
          throw new Error('You provide incorrect token');
        }
        if (user) {
          const hasRole = (role: Roles) => {
            if (user && Array.isArray(user.roles)) {
              return user.roles.includes(role);
            }
            return false;
          }
          console.log("-- 1 --");
          return { req, res, user, hasRole }
        }
        console.log("-- 2 --");
        return { req, res };
      },
      playground: true,
    });
    const app = express();
    await client.connect();
    app.use(cookieParser());

    app.get("/playground", expressPlayground({ endpoint: "/graphql" }))
    server.applyMiddleware({ app });
    app.listen({ port: 4005 }, () =>
      console.log(`GraphQL Server running 🚀 http://localhost:4005${server.graphqlPath}`)
    );
  } catch (e) {
    console.error("Server don't started", e);
  }
})();
