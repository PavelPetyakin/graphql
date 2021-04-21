import { GraphQLObjectType } from "graphql";

import { IOrderResolver, queryResolver as orderResolver } from "../order";
import {
  IPersonMutationResolver,
  IPersonQueryResolver,
  queryResolver as personQueryResolver
} from "../person";
import {
  ITranslationResolver,
  queryResolver as translationResolver
} from "../translation";

export type Queries =
  | IPersonQueryResolver
  | IOrderResolver
  | ITranslationResolver;

export type MeQueries =
  | Pick<IPersonQueryResolver, "user">
  | Pick<IOrderResolver, "order">
  | ITranslationResolver;

export type AdminQueries =
  | Pick<IPersonQueryResolver, "users">
  | Pick<IOrderResolver, "orders">;

export type Mutations = IPersonMutationResolver;
export type IGraphQLFieldConfigMap<T> = {
  [Prop in keyof T]: T[Prop];
} & {[key: string]: any};

export const MeNamespace = new GraphQLObjectType({
  name: "User",
  fields: (): IGraphQLFieldConfigMap<MeQueries> => ({
    user: personQueryResolver.user,
    order: orderResolver.order,
    ...translationResolver,
  })
});

export const AdminNamespace = new GraphQLObjectType({
  name: "Admin",
  fields: (): IGraphQLFieldConfigMap<AdminQueries> => ({
    users: personQueryResolver.users,
    orders: orderResolver.orders,
  })
});
