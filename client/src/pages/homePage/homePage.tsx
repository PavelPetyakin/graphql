import React from "react";

import { useDocumentTitle } from 'hooks';

import { gql,useQuery } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query {
    persons {
      person(id: 2) {
        id
        name
        surname
        orders {
          description
        }
      }
    }
  }
`;

export function HomePage() {
  useDocumentTitle('Record');
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { id, name, surname, orders } = data.persons.person;
  console.log('data', data);
  return (
    <div>
      HomePage
      <ul>
        <li>{id}</li>
        <li>{name}</li>
        <li>{surname}</li>
      </ul>
      <ol>
        {orders.map((o: any, i: number) => {
          return (
            <li key={i}>{o.description}</li>
          )
        })}
      </ol>
    </div>
  )
}
