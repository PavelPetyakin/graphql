import React from "react";

import s from "./style.module.css";

interface ISticker {
  size: "s" | "m" | "l";
  color: string;
  data: ITranslation;
}

interface ITranslation {
  word: string;
  wordExample?: string;
  transcription: string;
  translation?: string;
  translationExample?: string;
}

export function Sticker(props: ISticker) {
  const { size, color, data } = props;

  if (size === "s") {
    return (
      <div className={s.sticker} style={{ backgroundColor: color }}>
        <p className={s.word}>{data.word}</p>
        <p className={s.transcription}>[{data.transcription}]</p>
      </div>
    )
  }

  if (size === "l") {
    return (
      <div className={s.sticker} style={{ backgroundColor: color }}>
        <p className={s.word}>{data.word}</p>
        <p className={s.example}>{data.wordExample}</p>
        <p className={s.transcription}>[{data.transcription}]</p>
        <p className={s.word}>{data.translation}</p>
        <p className={s.example}>{data.translationExample}</p>
      </div>
    )
  }

  return (
    <div className={s.sticker} style={{ backgroundColor: color }}>
      <p className={s.word}>{data.word}</p>
      <p className={s.transcription}>[{data.transcription}]</p>
      <p className={s.word}>{data.translation}</p>
    </div>
  )
}
