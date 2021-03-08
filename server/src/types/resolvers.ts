import { resolver as personResolver } from './person/resolver';
import { resolver as orderResolver } from './order/resolver';
import { resolver as translationResolver } from './translation/resolver';

export const resolvers = {
  Query: {
    persons: () => personResolver,
    orders: () => orderResolver,
    translations: () => translationResolver
  }
};
