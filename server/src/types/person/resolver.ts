import { getPeople, getPerson } from "./service";
import { person, Sorting } from "./pesrson";
import { GraphQLFloat, GraphQLList, GraphQLNonNull } from "graphql";
import { IPersonResolver, IPerson } from "./types";

export const queryResolver: IPersonResolver = {
  user: {
    type: person,
    args: {
      id: { type: GraphQLNonNull(GraphQLFloat) }
    },
    resolve: (_parent, args, context, info): Promise<IPerson> => getPerson(args.id),
  },
  users: {
    type: new GraphQLList(person),
    args: {
      sorting: { type: GraphQLNonNull(Sorting) }
    },
    resolve: (_parent, args, context, info): Promise<IPerson[]> => getPeople(args.sorting),
  },
};
