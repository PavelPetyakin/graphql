import { IGraphQLFieldConfig } from "../shcema";
import { IOrder } from "../order";

export interface IPersonQueryResolver {
  user: IGraphQLFieldConfig<Record<string, string>, IUserArgs>;
  users: IGraphQLFieldConfig<Record<string, string>, IUsersArgs>;
}

export interface IPersonMutationResolver {
  register: IGraphQLFieldConfig<Record<string, string>, IRegisterUserArgs>;
  login: IGraphQLFieldConfig<Record<string, string>, ILoginUserArgs>;
}

export interface IPerson {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  roles: Roles[];
  permissions: Permissions[];
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

// export interface IRegisterUserArgs extends Pick<IPerson, "name" | "email" | "password" | "surname"> {}
export interface IRegisterUserArgs extends Pick<IPerson, "name" | "email" | "password"> {
  surname?: string;
}

export interface ILoginUserArgs extends Pick<IPerson, "email" | "password"> {}

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
