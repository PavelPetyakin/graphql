import React from "react";
import cx from "classnames";

import { Button, ColorSelector, Sticker } from "components";

import s from "./style.module.css";

interface ICard {
  className?: string;
  onClick: () => void;
}

const defaultColors: string[] = [
  "#FAF00C",
  "#F6630F",
  "#5DFC36",
  "#458CF8",
  "#C4C4C4",
]

export function Card(props: ICard) {
  const { className, onClick } = props;
  const data = {
    word: "Word",
    wordExample: "Word example",
    transcription: "Transcription",
    translation: "Translation",
    translationExample: "Translation example",
  }

  return (
    <div className={cx(s.container, className)}>
      <div className={s.glass}>
        <Sticker
          size="Medium"
          color="#FAF00C"
          fontFamily="Roboto Slab"
          data={data}
        />
      </div>
      <div className={s.shadow} />
      <div className={s.bottom}>
        <ColorSelector
          className={s.colors}
          name="color"
          options = { defaultColors }
          checkedColor="#FAF00C"
          onChange={() => undefined}
        />
        <p>от 1000 рублей</p>
        <Button
          className={s.button}
          text="Конструктор"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
