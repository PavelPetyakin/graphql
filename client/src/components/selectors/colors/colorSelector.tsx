import React, { SyntheticEvent } from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IColorSelector {
  label?: string;
  name: string;
  colors: string[];
  onChange: (val: Record<string, string>) => void;
  checkedColor: string;
  className?: string;
}

export function ColorSelector(props: IColorSelector) {
  const { colors, label, checkedColor, className, onChange, name } = props;
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    onChange({ [name]: value });
  }

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
              onChange={handleChange}
              name={name}
            />
            <div className={s.radio} style={{ backgroundColor: color }} />
          </label>
        ))}
      </div>
    </div>
  );
}
