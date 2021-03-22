import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

export const WordCategory = new GraphQLEnumType({
  name: "WordCategory",
  values: {
    TIME: { value: "TIME" },
    ANIMAL: { value: "ANIMAL" },
    WEEKDAY: { value: "WEEKDAY" },
  }
});

export const translation: GraphQLObjectType = new GraphQLObjectType({
  name: "Translation",
  description: "Dictionary",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      type: new GraphQLNonNull(WordCategory),
    },
    english: {
      type: new GraphQLNonNull(GraphQLString),
    },
    transcription: {
      type: new GraphQLNonNull(GraphQLString),
    },
    russian: {
      type: new GraphQLNonNull(GraphQLString),
    },
    english_example: {
      type: GraphQLString,
    },
    russian_example: {
      type: GraphQLString,
    },
  })
})
