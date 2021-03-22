import { getTranslationList } from "./service";
import { GraphQLList, GraphQLNonNull } from "graphql";
import { translation, WordCategory } from "./translation";
import { ITranslationResolver, ITranslation } from "./types";

export const queryResolver: ITranslationResolver = {
  translation: {
    type: new GraphQLList(translation),
    args: {
      type: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(WordCategory))) }
    },
    resolve: (_parent, args): Promise<ITranslation[]> => getTranslationList(args.type),
  },
};
