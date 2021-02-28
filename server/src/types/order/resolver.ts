const orders = [
  {
    id: '1',
    description: 'first order',
    createdAt: '23-02-2020',
  },
  {
    id: '2',
    description: 'second order',
    createdAt: '12-08-2018',
  },
  {
    id: '3',
    description: 'third order',
    createdAt: '1-05-1996',
  },
];

export const resolver = {
  orders: () => orders,
  order: (parent: { id: string }) => orders.find(o => o.id === parent.id),
};
