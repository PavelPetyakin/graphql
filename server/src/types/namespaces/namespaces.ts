import { GraphQLObjectType } from "graphql";

import { IOrderResolver, queryResolver as orderResolver } from "../order";
import {
  IPersonMutationResolver,
  IPersonQueryResolver,
  mutationResolver as personMutationResolver,
  queryResolver as personQueryResolver } from "../person";
import {
  ITranslationResolver,
  queryResolver as translationResolver
} from "../translation";

export type MeQueries =
  | Pick<IPersonQueryResolver, "user">
  | Pick<IOrderResolver, "order">
  | ITranslationResolver;

export type AdminQueries =
  | Pick<IPersonQueryResolver, "users">
  | Pick<IOrderResolver, "orders">;

export type ViewerMutations =
  | Pick<IPersonMutationResolver, "login" | "register">;

export type MeMutations =
  | Pick<IPersonMutationResolver, "logout">;

export type Mutations = IPersonMutationResolver;
export type IGraphQLFieldConfigMap<T> = {
  [Prop in keyof T]: T[Prop];
} & {[key: string]: any};

export const MeNamespaceQueries = new GraphQLObjectType({
  name: "UserQueries",
  fields: (): IGraphQLFieldConfigMap<MeQueries> => ({
    user: personQueryResolver.user,
    order: orderResolver.order,
    ...translationResolver,
  })
});

export const AdminNamespaceQueries = new GraphQLObjectType({
  name: "AdminQueries",
  fields: (): IGraphQLFieldConfigMap<AdminQueries> => ({
    users: personQueryResolver.users,
    orders: orderResolver.orders,
  })
});

export const ViewerNamespaceMutations = new GraphQLObjectType({
  name: "ViewerMutation",
  fields: (): IGraphQLFieldConfigMap<ViewerMutations> => ({
    login: personMutationResolver.login,
    register: personMutationResolver.register,
  })
});

export const MeNamespaceMutations = new GraphQLObjectType({
  name: "UserMutation",
  fields: (): IGraphQLFieldConfigMap<MeMutations> => ({
    logout: personMutationResolver.logout,
  })
});
