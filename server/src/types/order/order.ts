import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

export const order: GraphQLObjectType = new GraphQLObjectType({
  name: "Order",
  description: "Person's orders",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    description: {
      type: GraphQLString,
    },
    created: {
      type: GraphQLString,
    },
  })
})
