import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString } from "graphql";

import { getOrdersByUser, IOrder, order } from "../order";
import { IContext } from "../shcema";

import { getUsers } from "./service";
import { IPerson, IUsersArgs } from "./types";

const SortDirection = new GraphQLEnumType({
  name: "sort",
  values: {
    ASC: { value: "ASC" },
    DESC: { value: "DESC" },
  }
});

const SortableField = new GraphQLEnumType({
  name: "sortBy",
  values: {
    id: { value: "id" },
    created: { value: "created" },
  }
});

export const Sorting = new GraphQLInputObjectType({
  name: "sorting",
  fields: {
    sort: { type: new GraphQLNonNull(SortDirection) },
    sortBy: { type: new GraphQLNonNull(SortableField) },
  }
});

export const person: GraphQLObjectType<Record<string, string>, IContext> =
  new GraphQLObjectType({
    name: "Person",
    description: "Customer",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      name: {
        type: GraphQLString,
      },
      surname: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      orders: {
        type: new GraphQLList(order),
        resolve: (parent): Promise<IOrder[]> =>
          getOrdersByUser(parent.id),
      },
      created: {
        type: GraphQLString,
      },
      password: {
        type: GraphQLString,
      },
      roles: {
        type: GraphQLList(GraphQLString),
      },
      users: {
        type: new GraphQLList(person),
        args: {
          sorting: { type: GraphQLNonNull(Sorting) }
        },
        resolve: (
          _parent,
          args,
          context: IContext
        ): Promise<IPerson[] | null> => getUsers(args as IUsersArgs, context),
      },
    })
})
