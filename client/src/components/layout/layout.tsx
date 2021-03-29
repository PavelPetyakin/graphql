import React, { ReactNode } from "react";

import s from "./style.module.css";

interface ILayout {
  children: ReactNode;
}

export function Layout(props: ILayout) {
  const { children } = props;

  return (
    <section className={s.layout}>
      <h2 className={s.logo}>Word Stickers</h2>
      {children}
    </section>
  )
}
