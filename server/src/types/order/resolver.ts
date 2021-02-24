const orders = [
  {
    id: '1',
    description: 'first order',
  },
  {
    id: '2',
    description: 'second order',
  },
  {
    id: '3',
    description: 'third order',
  },
];

export const resolver = {
  orders: () => orders,
  order: (parent: { id: string }) => orders.find(o => o.id === parent.id),
};
