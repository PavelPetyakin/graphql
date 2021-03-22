import { IOrder } from "../order";
import { IGraphQLFieldConfig } from "../shcema";

export interface IPersonQueryResolver {
  user: IGraphQLFieldConfig<Record<string, string>, IUserArgs>;
  users: IGraphQLFieldConfig<Record<string, string>, IUsersArgs>;
}

export interface IPersonMutationResolver {
  register: IGraphQLFieldConfig<Record<string, string>, IRegisterUserArgs>;
  login: IGraphQLFieldConfig<Record<string, string>, ILoginUserArgs>;
}

export interface IAuth extends IPerson {
  password: string;
}

export interface IPerson {
  id: number;
  name: string;
  surname: string;
  email: string;
  roles: Roles[]; /** НЕТ В БД */
  permissions: Permissions[]; /** НЕТ В БД */
  created: string;
  orders?: IOrder[];
}

enum Permissions {
  Admin= "ADMIN",
  Client= "CLIENT",
}

export enum Roles {
  Director= "DIRECTOR",
  Client= "CLIENT",
}

export interface IUserArgs extends Pick<IPerson, "id"> {}

export interface IRegisterUserArgs
  extends Pick<IAuth, "name" | "email" | "password"> {
  surname?: string;
}

export interface ILoginUserArgs extends Pick<IAuth, "email" | "password"> {}

export interface IUsersArgs {
  sorting: {
    sort: Sort;
    sortBy: SortBy;
  }
}

export enum Sort {
  ASC = "ASC",
  DESC = "DESC",
}

export enum SortBy {
  ID = "id",
  CREATED = "id",
}
