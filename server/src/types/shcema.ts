import {
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";
import {
  GraphQLFieldConfig,
} from "graphql/type/definition";
import express from "express";

import { Roles } from "./person/types";

import { IOrderResolver,queryResolver as orderResolver } from "./order";
import {
  IPerson,
  IPersonMutationResolver,
  IPersonQueryResolver,
  mutationResolver as personMutationResolver,
  queryResolver as personQueryResolver
} from "./person";
import {
  ITranslationResolver,
  queryResolver as translationResolver } from "./translation";

export interface IContext {
  req: express.Request;
  res: express.Response;
  user: IPerson | null;
  hasRole?: (role: Roles) => boolean;
}

export interface IGraphQLFieldConfig<TSource, TArgs> extends GraphQLFieldConfig<TSource, IContext, TArgs> {}
type Queries = IPersonQueryResolver | IOrderResolver | ITranslationResolver;
type Mutations = IPersonMutationResolver;
type IGraphQLFieldConfigMap<T> = {
  [Prop in keyof T]: T[Prop];
} & {[key: string]: any};

export const query: GraphQLObjectType<Record<string, string>, IContext> = new GraphQLObjectType({
  name: "Query",
  fields: (): IGraphQLFieldConfigMap<Queries> => ({
  ...personQueryResolver,
  ...orderResolver,
  ...translationResolver,
  }),
})

export const mutation: GraphQLObjectType<Record<string, string>, IContext> = new GraphQLObjectType({
  name: "Mutation",
  fields: (): IGraphQLFieldConfigMap<Mutations> => ({
  ...personMutationResolver,
  }),
})

export const schema = new GraphQLSchema({
  query: query,
  mutation: mutation
});
