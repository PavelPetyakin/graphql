import React, { SyntheticEvent } from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IInput {
  label?: string;
  className?: string;
  value: number | string;
  type: string;
  name: string;
  placeholder?: string;
  onChange: (val: Record<string, string>) => void;
}

export function Input(props: IInput) {
  const { label, className="", onChange, ...other } = props;
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    onChange({ [name]: value });
  }

  const withLabel = (
    <label className={s.label}>
      {label}
      <input
        className={cx(s.input, className)}
        onChange={handleChange}
        {...other} />
    </label>
  );

  const withoutLabel = (
    <input className={cx(s.input, className)} {...other} />
  );

  return label ? withLabel : withoutLabel;
}
