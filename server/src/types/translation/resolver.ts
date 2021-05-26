import { GraphQLList, GraphQLNonNull } from "graphql";

import { getTranslationList } from "./service";
import { Language, translation, WordCategory } from "./translation";
import { ITranslation, ITranslationArgs, ITranslationResolver } from "./types";

export const queryResolver: ITranslationResolver = {
  translation: {
    type: new GraphQLList(translation),
    args: {
      type: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(WordCategory))) },
      lang: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Language))) }
    },
    resolve: (_parent, args: ITranslationArgs): Promise<ITranslation[]> => (
      getTranslationList(args)
    ),
  },
};
