import { resolver as personResolver } from './person/resolver';
import { resolver as orderResolver } from './order/resolver';

export const resolvers = {
  Query: {
    persons: () => personResolver,
    orders: () => orderResolver
  }
};
