import { IGraphQLFieldConfig } from "../shcema";

export interface IOrderResolver {
  order: IGraphQLFieldConfig<Record<string, string>, IOrderArgs>;
  orders: IGraphQLFieldConfig<Record<string, string>, Record<string, string>>;
}

export interface IOrder {
  id: number;
  description: string;
  created: string;
}

interface IOrderArgs {
  id: string;
}
