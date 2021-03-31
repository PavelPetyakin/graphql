import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  // uri: "/graphql",
  uri: "http://localhost:4005/graphql",
  credentials: "include",
  // headers: "Access-Control-Allow-Credentials",
});

export const client = new ApolloClient({
  // uri: "http://localhost:4005/graphql",
  link,
  cache: new InMemoryCache()
});
