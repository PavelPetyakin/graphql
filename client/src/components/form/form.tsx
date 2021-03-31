import React, { ReactNodeArray } from "react";
import cx from "classnames";

import s from "./style.module.css";

interface IForm {
  className?: string;
  children: ReactNodeArray;
}

export function Form(props: IForm) {
  const { className, children } = props;
  console.log("children", children);

  return (
    <form
      className={cx(s.form, className)}
      onSubmit={(e) => e.preventDefault()}
    >
      {children.map((el) => {
        return el;
      })}
    </form>
  );
}
