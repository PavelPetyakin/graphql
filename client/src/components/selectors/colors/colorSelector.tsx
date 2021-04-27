import React, { SyntheticEvent } from "react";

import s from "./style.module.css";

interface IColorSelector {
  label?: string;
  name: string;
  colors: string[];
  onChange: (val: SyntheticEvent<HTMLInputElement>) => void;
  defaultColor: string;

}

export function ColorSelector(props: IColorSelector) {
  const { colors, label, defaultColor, ...other } = props;

  return (
    <div className={s.container}>
      {label}
      <div className={s.colors}>
        {colors.map((color: string, index: number) => (
          <label className={s.label} key={index}>
            <input
              className={s.input}
              value={color}
              defaultChecked={color === defaultColor}
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
