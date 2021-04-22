import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GraphQLFieldConfig, } from "graphql/type/definition";
import express from "express";

import { Roles } from "./person/types";

import {
  AdminNamespaceQueries,
  MeNamespaceMutations,
  MeNamespaceQueries,
  ViewerNamespaceMutations,
} from "./namespaces";
import { IPerson } from "./person";

export interface IContext {
  req: express.Request;
  res: express.Response;
  user: IPerson | null;
  hasRole?: (role: Roles) => boolean;
}

export interface IGraphQLFieldConfig<TSource, TArgs>
  extends GraphQLFieldConfig<TSource, IContext, TArgs> {}

export const query: GraphQLObjectType<Record<string, string>, IContext> =
  new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      me: {
        type: MeNamespaceQueries,
        resolve: (_, __, context: IContext) => {
          if (context.hasRole && context.hasRole(Roles.Client)) {
            return {};
          }
          return null;
        }
      },
      admin: {
        type: AdminNamespaceQueries,
        resolve: (_, __, context: IContext) => {
          if (context.hasRole && context.hasRole(Roles.Admin)) {
            return {};
          }
          return null;
        }
      }
    }),
});

export const mutation: GraphQLObjectType<Record<string, string>, IContext> =
  new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      me: {
        type: MeNamespaceMutations,
        resolve: (_, __, context: IContext) => {
          if (context.hasRole && context.hasRole(Roles.Client)) {
            return {};
          }
          return null;
        }
      },
      viewer: {
        type: ViewerNamespaceMutations,
        resolve: () => ({}),
      }
    }),
});

export const schema = new GraphQLSchema({
  query: query,
  mutation: mutation
});
