import React from "react";

import s from "./style.module.css";

interface IColorSelector {
  label?: string;
  colors: string[];
}

export function ColorSelector(props: IColorSelector) {
  const { colors, label } = props;

  return (
    <div className={s.container}>
      {label}
      <div className={s.colors}>
        {colors.map((color: string, index: number) => (
          <label className={s.label} key={index}>
            <input
              className={s.input}
              type="radio"
              name="color"
              value={color}
            />
            <div className={s.radio} style={{ backgroundColor: color }} />
          </label>
        ))}
      </div>
    </div>
  );
}
