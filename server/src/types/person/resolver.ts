import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from "graphql";

import { getUserFromRequest } from "../../auth";

import { person, Sorting } from "./pesrson";
import { getUsers, loginUser,registerUser } from "./service";
import {
  IPerson,
  IPersonMutationResolver,
  IPersonQueryResolver,
  Roles
} from "./types";

export const queryResolver: IPersonQueryResolver = {
  me: {
    type: person,
    resolve: async (_parent, _args, context): Promise<IPerson | null> => {
      const { res, req } = context;
      let user: IPerson | null = null;
      try {
        user = await getUserFromRequest({ req, res });
      } catch (e) {
        throw new Error("You provide incorrect token");
      }
      if (user) {
        const hasRole = (role: Roles): boolean => {
          if (user && Array.isArray(user.roles)) {
            return user.roles.includes(role);
          }

          return false;
        }

        return user;
      }
      return null;
    }
  },
  users: {
    type: new GraphQLList(person),
    args: {
      sorting: { type: GraphQLNonNull(Sorting) }
    },
    resolve: (_parent, args): Promise<IPerson[] | null> => (
      getUsers(args)
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
