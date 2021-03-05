import { getOrders, getOrder } from "./service";

export interface IOrder {
  id: number;
  description: string;
  created: string;
}

export const resolver = {
  orders: (): Promise<IOrder[]> => getOrders(),
  order: (parent: { id: string }): Promise<IOrder> => getOrder(parent),
};
