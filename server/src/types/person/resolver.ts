import { getUsers, getUser, registerUser, loginUser } from "./service";
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
    resolve: (_parent, args): Promise<IPerson> => getUser(args),
  },
  users: {
    type: new GraphQLList(person),
    args: {
      sorting: { type: GraphQLNonNull(Sorting) }
    },
    resolve: (_parent, args, context): Promise<IPerson[]> => getUsers(args, context),
  },
};

export const mutationResolver: IPersonMutationResolver = {
  register: {
    type: person,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
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
    resolve: (_parent, args, context): Promise<IPerson | null> => loginUser(args, context),
  },
};
