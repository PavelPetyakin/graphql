import React from "react";
import cx from "classnames";

import s from "./style.module.css";

interface ISticker {
  size: "Small" | "Medium" | "Large";
  color: string;
  fontFamily: string;
  data: ITranslation;
  className?: string;
  plotter?: boolean;
}

export interface ITranslation {
  word: string;
  word_example?: string;
  transcription: string;
  translation?: string;
  translation_example?: string;
}

export function Sticker(props: ISticker) {
  const { size, color, fontFamily, data, className, plotter = false } = props;

  if (size === "Small") {
    return (
      <div
        className={cx(s.sticker, className, { [s.plotter]: plotter })}
        style={{ backgroundColor: color, borderColor: color }}
      >
        <p className={s.word} style={{ fontFamily }}>{data.word}</p>
        <p className={s.transcription}>{data.transcription}</p>
      </div>
    )
  }

  if (size === "Large") {
    return (
      <div
        className={cx(s.sticker, className, { [s.plotter]: plotter })}
        style={{ backgroundColor: color, borderColor: color }}
      >
        <p className={s.word} style={{ fontFamily }}>{data.word}</p>
        <p className={s.example}>{data.word_example}</p>
        <p className={s.transcription}>{data.transcription}</p>
        <p className={s.word} style={{ fontFamily }}>{data.translation}</p>
        <p className={s.example}>{data.translation_example}</p>
      </div>
    )
  }

  return (
    <div
      className={cx(s.sticker, className, { [s.plotter]: plotter })}
      style={{ backgroundColor: color, borderColor: color }}
    >
      <p className={s.word} style={{ fontFamily }}>{data.word}</p>
      <p className={s.transcription}>{data.transcription}</p>
      <p className={s.word} style={{ fontFamily }}>{data.translation}</p>
    </div>
  )
}
