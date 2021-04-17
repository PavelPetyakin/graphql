import React from "react";

import { Input,Layout } from "components";

import s from "./style.module.css";

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
      <Input type="text" label="Шрифт" value="" onChange={() => undefined} />
      <div>Цвет Фона</div>
      <div>Размер Стикера</div>
      <div>Радиус Углов</div>
      <div>Контур</div>
    </aside>
  )
}
