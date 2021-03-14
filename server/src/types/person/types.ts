import { IGraphQLFieldConfig } from "../shcema";
import { IOrder } from "../order";

export interface IPersonQueryResolver {
  user: IGraphQLFieldConfig<Record<string, string>, IUserArgs>;
  users: IGraphQLFieldConfig<Record<string, string>, IUsersArgs>;
}

export interface IPersonMutationResolver {
  addUser: IGraphQLFieldConfig<Record<string, string>, IAddUserArgs>;
}

export interface IPerson {
  id: number;
  name: string;
  surname: string;
  email: string;
  created: string;
  orders?: IOrder[];
}

export interface IUserArgs extends Pick<IPerson, "id"> {}

export interface IAddUserArgs extends Pick<IPerson, "name" | "surname" | "email"> {}

export interface IUsersArgs {
  sorting: {
    sort: {
      ASC: string;
      DESC: string;
    };
    sortBy: {
      id: string;
      created: Date;
    };
  }
}
