export { getUsers, getUser, registerUser, loginUser } from "./service";
export { queryResolver, mutationResolver } from "./resolver";
export { person, Sorting } from "./pesrson";
export {
  IPersonQueryResolver,
  IPersonMutationResolver,
  IPerson,
  IUserArgs,
  IUsersArgs,
  IRegisterUserArgs,
  ILoginUserArgs,
} from "./types";
