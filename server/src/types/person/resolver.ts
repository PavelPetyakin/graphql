import { getPeople, getPeopleAmount, getPerson } from "./service";

export interface IPerson {
  id: number;
  name?: string;
  surname?: string;
  email?: string;
  created?: string;
  // orders?: IOrder[];
}

interface IOrder {
  id: string;
  description?: string;
}

export const resolver = {
  people: async (parent: any): Promise<IPerson[]> => getPeople(parent),
  amount: async (): Promise<number> => getPeopleAmount(),
  person: async (parent: {id: string}): Promise<IPerson> => getPerson(parent),
};
