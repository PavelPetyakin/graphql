import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from "graphql";

import { person, Sorting } from "./pesrson";
import { getUser, getUsers, loginUser,registerUser } from "./service";
import { IPerson,IPersonMutationResolver, IPersonQueryResolver } from "./types";

export const queryResolver: IPersonQueryResolver = {
  user: {
    type: person,
    resolve: (_parent, _args, context): Promise<IPerson | null> =>
      getUser(context),
  },
  users: {
    type: new GraphQLList(person),
    args: {
      sorting: { type: GraphQLNonNull(Sorting) }
    },
    resolve: (_parent, args, context): Promise<IPerson[] | null> => (
      getUsers(args, context)
    ),
  },
};

export const mutationResolver: IPersonMutationResolver = {
  register: {
    type: person,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      surname: { type: GraphQLString },
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: (_parent, args): Promise<IPerson> => registerUser(args),
  },
  login: {
    type: person,
    args: {
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (_parent, args, context): Promise<IPerson | null> => (
      loginUser(args, context)
    ),
  },
};
