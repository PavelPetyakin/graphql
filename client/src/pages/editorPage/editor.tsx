import React from "react";

import { Layout } from "components";

import s from "./style.module.css";

export function EditorPage() {
  return (
    <Layout>
      <div className={s.shadow}/>
      <div className={s.container}>
        <article>EditorPage</article>
        <aside>menu</aside>
      </div>
    </Layout>
  );
}
