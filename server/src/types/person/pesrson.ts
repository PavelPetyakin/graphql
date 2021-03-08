import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull, GraphQLFloat, GraphQLEnumType, GraphQLInputObjectType
} from "graphql";
import { getPeople, getPerson } from "./service";
import { getOrder } from "../order/service";

interface IPerson {
  id: number;
  name: string;
  surname: string;
  email: string;
  created: Date;
}

const SortDirection = new GraphQLEnumType({
  name: 'sort',
  values: {
    ASC: { value: "ASC" },
    DESC: { value: "DESC" },
  }
});

const SortableField = new GraphQLEnumType({
  name: 'sortBy',
  values: {
    id: { value: "id" },
    created: { value: "created" },
  }
});

const Sorting = new GraphQLInputObjectType({
  name: 'sorting',
  fields: {
    sort: { type: new GraphQLNonNull(SortDirection) },
    sortBy: { type: new GraphQLNonNull(SortableField) },
  }
});

export const person: GraphQLObjectType = new GraphQLObjectType({
  name: "Person",
  description: "Some description",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
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
      resolve: (parent) => getOrder(parent),
    },
    created: {
      type: GraphQLString,
    },
  })
})

export const order: GraphQLObjectType = new GraphQLObjectType({
  name: "Order",
  description: "Some description",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    description: {
      type: GraphQLString,
    },
    created: {
      type: GraphQLString,
    },
  })
})

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: person,
      args: {
        id: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve: (_, {id}) => getPerson(id),
    },
    users: {
      type: new GraphQLList(person),
      args: {
        sorting: { type: GraphQLNonNull(Sorting) }
      },
      resolve: (_, {sorting}) => getPeople(sorting),
    }
  })
})
