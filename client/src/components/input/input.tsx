import React, { SyntheticEvent } from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IInput {
  label?: string;
  className?: string;
  value: number | string;
  type: string;
  placeholder?: string;
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void;
}

export function Input(props: IInput) {
  const { label, className="", ...other } = props;

  const withLabel = (
    <label className={s.label}>
      {label}
      <input className={cx(s.input, className)} {...other} />
    </label>
  );

  const withoutLabel = (
    <input className={cx(s.input, className)} {...other} />
  );

  return label ? withLabel : withoutLabel;
}
