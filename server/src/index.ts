import expressPlayground from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { Client } from "pg";

import { IPerson } from "./types/person";
import { Roles } from "./types/person/types";
import { IContext, schema } from "./types/shcema";

import { getUserFromRequest } from "./auth";

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
      context: async ({ req, res }): Promise<IContext> => {
        let user: IPerson | null = null;
        try {
          user = await getUserFromRequest({ req, res });
          console.log("user", user)
        } catch (e) {
          throw new Error("You provide incorrect token");
        }
        if (user) {
          const hasRole = (role: Roles): boolean => {
            if (user && Array.isArray(user.roles)) {
              return user.roles.includes(role);
            }
            return false;
          }
          console.log("-- 1 --");
          return { req, res, user, hasRole }
        }
        console.log("-- 2 --");
        return { req, res, user };
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
