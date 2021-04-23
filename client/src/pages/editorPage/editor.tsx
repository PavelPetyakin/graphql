import React from "react";

import { ColorSelector,Input, Layout } from "components";

import s from "./style.module.css";


const test: string[] = [
  "#FAF00C",
  "#F6630F",
  "#5DFC36",
  "#458CF8",
  "#C4C4C4",
]

export function EditorPage() {
  return (
    <Layout>
      <div className={s.container}>
        <article>EditorPage</article>
        <SideMenu />
      </div>
    </Layout>
  );
}

function SideMenu() {
  return (
    <aside className={s.settings}>
      <form className={s.form}>
        <Input type="text" label="Шрифт" value="" onChange={() => undefined} />
        <ColorSelector label="Цвет" colors={test} />
        <div>Размер Стикера</div>
        <div>Радиус Углов</div>
        <div>Контур</div>
        <input type="submit" onClick={(e) => (
          e.preventDefault(),
          console.log(e)
          )}
        />
      </form>
    </aside>
  )
}
