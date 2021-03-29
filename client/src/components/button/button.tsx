import React from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IButton {
  name: string;
  onClick: () => void;
  className?: string;
}

export function Button(props: IButton) {
  const { name, onClick, className } = props;

  return (
    <button className={cx(s.button, className)} onClick={onClick}>
      {name}
    </button>
  );
}
