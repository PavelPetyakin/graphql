import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt, GraphQLFieldConfigMap,
  GraphQLNonNull, GraphQLFloat, GraphQLEnumType, GraphQLInputObjectType
} from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { getPeople, getPerson } from "./service";

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
  name: 'GeoPoint',
  fields: {
    sort: { type: new GraphQLNonNull(SortDirection) },
    sortBy: { type: new GraphQLNonNull(SortableField) },
  }
});

export const person: GraphQLObjectType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      // description: "user id",
      // resolve: () => 2,
    },
    name: {
      type: GraphQLString,
      // description: "user name",
      // resolve: () => "Pavel",
    },
    surname: {
      type: GraphQLString,
      // description: "user surname",
      // resolve: () => "Petyakin",
    },
    email: {
      type: GraphQLString,
      // description: "user email",
      // resolve: () => "petakin86@mail.ru",
    },
    orders: {
      // type: new GraphQLList(),
      type: GraphQLString,
      // description: "user email",
      // resolve: () => "petakin86@mail.ru",
    },
    created: {
      type: GraphQLString,
      // description: "when created user card",
      // resolve: () => "2021-3-7",
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
