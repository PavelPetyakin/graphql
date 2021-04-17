import expressPlayground from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { Client } from "pg";

import { IPerson } from "./types/person";
import { Roles } from "./types/person/types";
import { IContext, schema } from "./types/shcema";

import { getUserFromRequest } from "./auth";

const corsOptions = {
  origin: "http://localhost:4000",
  // origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  // exposedHeaders: [ "Content-Range", "X-Content-Range" ],
  credentials: true,
  // preflightContinue: false,
  optionsSuccessStatus: 200
}

const host = process.env.RECORD_DB_SERVER_HOST || "localhost";
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const port = process.env.RECORD_DB_SERVER_PORT || 5432;
const user = process.env.RECORD_DB_USER || "";
const password = process.env.RECORD_DB_PASSWORD || "";
const database = process.env.RECORD_DB_NAME || "graphql";

export const client = new Client({
  host,
  port: +port,
  user,
  password,
  database,
});

(async () => {
  try {
    const server = new ApolloServer({
      schema,
      context: async ({ req, res }): Promise<IContext> => {
        let user: IPerson | null = null;
        try {
          user = await getUserFromRequest({ req, res });
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
          console.log("user", user);
          return { req, res, user, hasRole }
        }
        console.log("user", user);
        return { req, res, user: null };
      },
      playground: true,
    });
    const app = express();
    app.use(cookieParser());
    await client.connect();

    app.get("/graphql", expressPlayground({ endpoint: "/graphql" }))
    server.applyMiddleware({ app, cors: corsOptions });
    app.listen({ port: 4005 }, () =>
      console.log(`GraphQL Server running 🚀 http://localhost:4005${server.graphqlPath}`)
    );
  } catch (e) {
    console.error("Server don't started", e);
  }
})();
