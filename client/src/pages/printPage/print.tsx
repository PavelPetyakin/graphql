import React from "react";

import { Sticker } from "components";
import { ITranslation } from "components/sticker/sticker";

import { gql, useQuery } from "@apollo/client";

import s from "./style.module.css";

const STICKERS = gql`
  query translations($type: [WordCategory!]!, $lang: [Language!]!) {
    me {
      translation(type: $type lang: $lang) {
        word
        word_example
        translation
        translation_example
        transcription
      }
    }
  }
`;

export function PrintPage() {
  const { data } = useQuery(STICKERS, {
    variables: {
      type: [
        "ANIMAL",
        "TIME",
        "WEEKDAY",
      ],
      lang: [
        "ES"
      ]
    }
  });

  if (data === undefined) return null;
  console.log("data", data)
  return (
    <div className={s.container}>
      {data.me.translation.map((tr: ITranslation, index: number) => {
        return (
          <Sticker
            key={index}
            size="Large"
            color="#6AA4FC"
            fontFamily="Roboto Slab"
            data={tr}
          />
        );
      })}
    </div>
  )
}
