import { GraphQLObjectType, GraphQLSchema } from "graphql";
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

}
export interface IGraphQLFieldConfig<TSource, TArgs> extends GraphQLFieldConfig<TSource, IContext, TArgs> {}
type Queries = IPersonQueryResolver | IOrderResolver | ITranslationResolver;
type Mutations = IPersonMutationResolver;
export type IGraphQLFieldConfigMap<T> = {
  [Prop in keyof T]: T[Prop];
}

// Thunk<GraphQLFieldConfigMap<TSource, TContext>>

export const query: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Query",
  // @ts-ignore
  fields: (): IGraphQLFieldConfigMap<Queries> => ({
  ...personQueryResolver,
  ...orderResolver,
  ...translationResolver,
  }),
})

export const mutation: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: "Mutation",
  fields: (): IGraphQLFieldConfigMap<Mutations> => ({
  ...personMutationResolver,
  }),
})

export const schema = new GraphQLSchema({
  query: query,
  mutation: mutation
});
