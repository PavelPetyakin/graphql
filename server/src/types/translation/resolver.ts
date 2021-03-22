import { GraphQLList, GraphQLNonNull } from "graphql";

import { getTranslationList } from "./service";
import { translation, WordCategory } from "./translation";
import { ITranslation, ITranslationArgs, ITranslationResolver } from "./types";

export const queryResolver: ITranslationResolver = {
  translation: {
    type: new GraphQLList(translation),
    args: {
      type: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(WordCategory))) }
    },
    resolve: (_parent, args: ITranslationArgs): Promise<ITranslation[]> => (
      getTranslationList(args.type)
    ),
  },
};
