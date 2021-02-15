interface IPerson {
  id: string;
  name?: string;
  surname?: string;
  orders?: IOrder[];
}

interface IOrder {
  id: string;
  description?: string;
}

const people = [
  {
    id: '1',
    name: 'Kate',
    surname: 'Sorokina',
    orders: [
      {
        id: '2',
        description: 'second order',
      }
    ],
  },
  {
    id: '2',
    name: 'Paul',
    surname: 'Petyakin',
    orders: [
      {
        id: '3',
        description: 'third order',
      }
    ],
  },
  {
    id: '3',
    name: 'Ivan',
    surname: 'Vasiliev',
    orders: [
      {
        id: '1',
        description: 'first order',
      }
    ],
  },
];

export const resolver = {
  people: () => people,
  amount: () => people.length,
  person: (parent: {id: string}) => people.find(p => p.id === parent.id),
};
