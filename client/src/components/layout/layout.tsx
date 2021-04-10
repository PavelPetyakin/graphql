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
      <header className={s.header}>
        <Link className={s.logo} to="/">
          <h2>
            Word Stickers
          </h2>
        </Link>
        <div id="header" className={s.button}/>
      </header>
      {children}
    </section>
  )
}
