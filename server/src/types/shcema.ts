import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GraphQLFieldConfig, } from "graphql/type/definition";
import express from "express";

import { Roles } from "./person/types";

import {
  AdminNamespace,
  IGraphQLFieldConfigMap,
  MeNamespace,
  Mutations
} from "./namespaces";
import { IPerson, mutationResolver as personMutationResolver } from "./person";

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
        type: MeNamespace,
        resolve: (_, __, context: IContext) => {
          if (context.hasRole && context.hasRole(Roles.Client)) {
            return {};
          }
          return null;
        }
      },
      admin: {
        type: AdminNamespace,
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
    fields: (): IGraphQLFieldConfigMap<Mutations> => ({
    ...personMutationResolver,
    }),
});

export const schema = new GraphQLSchema({
  query: query,
  mutation: mutation
});
