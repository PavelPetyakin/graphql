import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} from "graphql";
import { getOrders, getOrderById } from "./service";
import { order } from "./order";
import { IOrderResolver, IOrder } from "./types";


export const queryResolver: IOrderResolver = {
  order: {
    type: order,
    args: {
      id: { type: GraphQLNonNull(GraphQLFloat) }
    },
    resolve: (_parent, args): Promise<IOrder> => getOrderById(args.id),
  },
  orders: {
    type: new GraphQLList(order),
    resolve: (): Promise<IOrder[]> => getOrders(),
  },
};
