import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { queryResolver as personResolver } from "./person";
import { queryResolver as orderResolver } from "./order";
import { queryResolver as translationResolver } from "./translation";
import { GraphQLFieldConfig } from "graphql/type/definition";
import { IPersonResolver } from "./person";
import { IOrderResolver } from "./order";
import { ITranslationResolver } from "./translation";

export interface IContext {

}
export interface IGraphQLFieldConfig<TSource, TArgs> extends GraphQLFieldConfig<TSource, IContext, TArgs> {}
type Resolvers = IPersonResolver | IOrderResolver | ITranslationResolver;
export type IGraphQLFieldConfigMap = {
  [Prop in keyof Resolvers]: Resolvers[Prop];
}

export const query: GraphQLObjectType<any, any> = new GraphQLObjectType({
  name: 'Query',
  fields: (): IGraphQLFieldConfigMap => ({
  ...personResolver,
  ...orderResolver,
  ...translationResolver,
  }),
})


export const schema = new GraphQLSchema({
  query: query
});
