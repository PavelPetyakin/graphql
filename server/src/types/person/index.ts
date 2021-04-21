export { getUser, getUsers, registerUser, loginUser } from "./service";
export { queryResolver, mutationResolver } from "./resolver";
export { person, Sorting } from "./pesrson";
export {
  IPersonQueryResolver,
  IPersonMutationResolver,
  IPerson,
  IUsersArgs,
  IRegisterUserArgs,
  ILoginUserArgs,
  Roles,
} from "./types";
