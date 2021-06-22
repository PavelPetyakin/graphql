import React from "react";
import { useLocation } from "react-router-dom";

import { Sticker } from "components";
import { ITranslation } from "components/sticker/sticker";

import { gql, useQuery } from "@apollo/client";
import { getQueryParams } from "utils/queryParametersParser";

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
  const { search } = useLocation<any>();
  const {
    lang = "en",
    size = "Large",
    color = "6AA4FC",
    plotter = false
  } = getQueryParams(search);

  const { data } = useQuery(STICKERS, {
    variables: {
      type: [
        "ANIMAL",
        "DAY",
        "WEEKDAY",
        "MONTH",
        "YEAR",
        "SEASON",
      ],
      lang: [
        lang
      ]
    }
  });

  if (data === undefined) return null;

  return (
    <div className={s.container}>
      {data.me.translation.map((tr: ITranslation, index: number) => {
        return (
          <Sticker
            key={index}
            size={size as "Small" | "Medium" | "Large"}
            color={`#${ color }`}
            plotter={plotter as boolean}
            fontFamily="Roboto Slab"
            data={tr}
          />
        );
      })}
    </div>
  )
}
