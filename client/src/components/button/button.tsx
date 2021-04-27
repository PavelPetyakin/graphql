import React from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IButton {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  className?: string;
}

export function Button(props: IButton) {
  const { text, className, ...other } = props;

  return (
    <button className={cx(s.button, className)} {...other}>
      {text}
    </button>
  );
}
