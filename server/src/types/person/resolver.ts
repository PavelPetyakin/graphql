import { getPeople, getPerson } from "./service";
import { person, Sorting } from "./pesrson";
import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from "graphql";
import { IPersonQueryResolver, IPersonMutationResolver, IPerson } from "./types";

export const queryResolver: IPersonQueryResolver = {
  user: {
    type: person,
    args: {
      id: { type: GraphQLNonNull(GraphQLFloat) }
    },
    resolve: (_parent, args): Promise<IPerson> => getPerson(args.id),
  },
  users: {
    type: new GraphQLList(person),
    args: {
      sorting: { type: GraphQLNonNull(Sorting) }
    },
    resolve: (_parent, args): Promise<IPerson[]> => getPeople(args.sorting),
  },
};

export const mutationResolver: IPersonMutationResolver = {
  addUser: {
    type: person,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      surname: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_parent, args): void => console.log("args", args),
  },
};
