import React from "react";
import cx from "classnames";

import s from "./style.module.css";

interface ISticker {
  size: "Small" | "Medium" | "Large";
  color: string;
  fontFamily: string;
  data: ITranslation;
  className?: string;
}

interface ITranslation {
  word: string;
  wordExample?: string;
  transcription: string;
  translation?: string;
  translationExample?: string;
}

export function Sticker(props: ISticker) {
  const { size, color, fontFamily, data, className } = props;

  if (size === "Small") {
    return (
      <div
        className={cx(s.sticker, className)}
        style={{ backgroundColor: color }}
      >
        <p className={s.word} style={{ fontFamily }}>{data.word}</p>
        <p className={s.transcription}>[{data.transcription}]</p>
      </div>
    )
  }

  if (size === "Large") {
    return (
      <div
        className={cx(s.sticker, className)}
        style={{ backgroundColor: color }}
      >
        <p className={s.word} style={{ fontFamily }}>{data.word}</p>
        <p className={s.example}>{data.wordExample}</p>
        <p className={s.transcription}>[{data.transcription}]</p>
        <p className={s.word} style={{ fontFamily }}>{data.translation}</p>
        <p className={s.example}>{data.translationExample}</p>
      </div>
    )
  }

  return (
    <div
      className={cx(s.sticker, className)}
      style={{ backgroundColor: color }}
    >
      <p className={s.word} style={{ fontFamily }}>{data.word}</p>
      <p className={s.transcription}>[{data.transcription}]</p>
      <p className={s.word} style={{ fontFamily }}>{data.translation}</p>
    </div>
  )
}
