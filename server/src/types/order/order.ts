import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

export const order: GraphQLObjectType = new GraphQLObjectType({
  name: "Order",
  description: "Customer's orders",
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
