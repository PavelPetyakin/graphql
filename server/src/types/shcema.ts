import express from 'express';
import {
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";
import { queryResolver as personQueryResolver, mutationResolver as personMutationResolver } from "./person";
import { queryResolver as orderResolver } from "./order";
import { queryResolver as translationResolver } from "./translation";
import {
  GraphQLFieldConfig,
} from "graphql/type/definition";
import { IPersonQueryResolver, IPersonMutationResolver } from "./person";
import { IOrderResolver } from "./order";
import { ITranslationResolver } from "./translation";

export interface IContext {
  req: express.Request,
  res: express.Response,
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
