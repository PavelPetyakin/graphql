import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLID
} from "graphql";
import { order, getOrdersByUser } from "../order";

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

export const person: GraphQLObjectType = new GraphQLObjectType({
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
      resolve: (parent) => getOrdersByUser(parent.id),
    },
    created: {
      type: GraphQLString,
    },
  })
})
