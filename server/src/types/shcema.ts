import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";
import { person, Sorting, getPeople, getPerson } from "./person";
import { order, getOrderById, getOrders } from "./order";
import { translation, WordCategory, getTranslationList } from "./translation";

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: person,
      args: {
        id: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve: (_, { id }) => getPerson(id),
    },
    users: {
      type: new GraphQLList(person),
      args: {
        sorting: { type: GraphQLNonNull(Sorting) }
      },
      resolve: (_, { sorting }) => getPeople(sorting),
    },
    order: {
      type: order,
      args: {
        id: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve: (_, { id }) => getOrderById(id),
    },
    orders: {
      type: new GraphQLList(order),
      resolve: () => getOrders(),
    },
    translation: {
      type: new GraphQLList(translation),
      args: {
        type: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(WordCategory))) }
      },
      resolve: (_, { type }) => getTranslationList(type),
    }
  })
})


export const schema = new GraphQLSchema({
  query: query
});
