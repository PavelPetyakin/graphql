import { IGraphQLFieldConfig } from "../shcema";
import { IOrder } from "../order";

export interface IPersonResolver {
  user: IGraphQLFieldConfig<Record<string, string>, IUserArgs>;
  users: IGraphQLFieldConfig<Record<string, string>, IUsersArgs>;
}

export interface IPerson {
  id: number;
  name?: string;
  surname?: string;
  email?: string;
  created?: string;
  orders?: IOrder[];
}

interface IUserArgs {
  id: string;
}

interface IUsersArgs {
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
