import React, { SyntheticEvent } from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IColorSelector {
  label?: string;
  name: string;
  colors: string[];
  onChange: (val: SyntheticEvent<HTMLInputElement>) => void;
  checkedColor: string;
  className?: string;
}

export function ColorSelector(props: IColorSelector) {
  const { colors, label, checkedColor, className, ...other } = props;

  return (
    <div className={cx(s.container, className)}>
      {label}
      <div className={s.colors}>
        {colors.map((color: string, index: number) => (
          <label className={s.label} key={index}>
            <input
              className={s.input}
              value={color}
              checked={color === checkedColor}
              type="radio"
              {...other}
            />
            <div className={s.radio} style={{ backgroundColor: color }} />
          </label>
        ))}
      </div>
    </div>
  );
}
