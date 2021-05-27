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

export const Language = new GraphQLEnumType({
  name: "Language",
  values: {
    en: { value: "english" },
    fr: { value: "french" },
    ru: { value: "russian" },
    es: { value: "spanish" },
    de: { value: "german" },
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
    word: {
      type: new GraphQLNonNull(GraphQLString),
    },
    transcription: {
      type: new GraphQLNonNull(GraphQLString),
    },
    translation: {
      type: new GraphQLNonNull(GraphQLString),
    },
    word_example: {
      type: GraphQLString,
    },
    translation_example: {
      type: GraphQLString,
    },
  })
})
