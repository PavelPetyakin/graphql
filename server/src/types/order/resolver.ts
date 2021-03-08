import { getOrders, getOrderById } from "./service";

export interface IOrder {
  id: number;
  description: string;
  created: string;
}

export const resolver = {
  orders: (): Promise<IOrder[]> => getOrders(),
  order: (id: string): Promise<IOrder> => getOrderById(id),
};
