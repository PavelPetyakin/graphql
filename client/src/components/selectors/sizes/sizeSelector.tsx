import React, { SyntheticEvent } from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IColorSelector {
  label?: string;
  name: string;
  options: string[];
  onChange: (val: Record<string, string>) => void;
  checkedColor: string;
  className?: string;
}

export function SizeSelector(props: IColorSelector) {
  const { options, label, checkedColor, className, onChange, name } = props;
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    onChange({ [name]: value });
  }

  return (
    <div className={cx(s.container, className)}>
      {label}
      <div className={s.sizes}>
        <div className={s.shadow}/>
        {options.map((elem: string, index: number) => (
          <label className={s.label} key={index}>
            <input
              className={s.input}
              value={elem}
              checked={elem === checkedColor}
              type="radio"
              onChange={handleChange}
              name={name}
            />
            <div className={s.radio}>{elem}</div>
          </label>
        ))}
      </div>
    </div>
  );
}
