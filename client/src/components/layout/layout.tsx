import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import s from "./style.module.css";

interface ILayout {
  children: ReactNode;
}

export function Layout(props: ILayout) {
  const { children } = props;

  return (
    <section className={s.layout}>
      <header id="header">
        <Link to="/">
          <h2 className={s.logo}>
            Word Stickers
          </h2>
        </Link>
      </header>
      {children}
    </section>
  )
}
