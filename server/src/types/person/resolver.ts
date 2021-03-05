import { getPeople, getPeopleAmount, getPerson } from "./service";
import { IOrder } from "../order/resolver";

export interface IPerson {
  id: number;
  name?: string;
  surname?: string;
  email?: string;
  created?: string;
  orders?: IOrder[];
}

export const resolver = {
  people: (parent: any): Promise<IPerson[]> => getPeople(parent),
  amount: (): Promise<number> => getPeopleAmount(),
  person: (parent: {id: string}): Promise<IPerson> => getPerson(parent),
};
