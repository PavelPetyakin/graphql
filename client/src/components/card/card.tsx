import React from "react";
import cx from "classnames";

import { Button } from "components";

import s from "./style.module.css";

interface ICard {
  className?: string;
  onClick: () => void;
}

export function Card(props: ICard) {
  const { className, onClick } = props;

  return (
    <div className={cx(s.container, className)}>
      <div className={s.glass}>
        <div className={s.sticker}>
          <p>Word</p>
          <p>[Transcription]</p>
          <p>translation</p>
        </div>
      </div>
      <div className={s.shadow} />
      <div className={s.bottom}>
        <ul>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
        </ul>
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
