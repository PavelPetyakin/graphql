import React from "react";

import { useDocumentTitle } from "hooks";

import { gql, useQuery } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query tr($types: [String!]!) {
    translation(type: $types) {
      english
      english_example
      transcription
      russian
      russian_example
    }
  }
`;

export function HomePage(  ) {
  useDocumentTitle("Record");
  const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    variables: [ "TIME", "WEEKDAY" ],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("data", data);
  const { translation } = data;

  return (
    <div>
      HomePage
      <ul>
        {translation.map((word: any, index: number) => {
          return (
            <li key={index} style={{ marginBottom: "20px" }}>
              <div>{word.english}</div>
              <div>{word.english_example}</div>
              <div>{word.transcription}</div>
              <div>{word.russian}</div>
              <div>{word.russian_example}</div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}
