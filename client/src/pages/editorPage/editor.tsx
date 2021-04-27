import React, { FormEvent, SyntheticEvent, useState } from "react";

import { Button, ColorSelector, Dropdown, Input, Layout } from "components";

import s from "./style.module.css";


const defaultColors: string[] = [
  "#FAF00C",
  "#F6630F",
  "#5DFC36",
  "#458CF8",
  "#C4C4C4",
]

const initialValues = {
  comment: "Hello!",
  color: "#FAF00C",
  language: "French",
}

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
  const [ state, setState ] = useState<Record<string, any>>(initialValues);
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit:", e);
  }
  console.log("state:", state);
  return (
    <aside className={s.settings}>

      <form className={s.form} onSubmit={handleSubmit} >
        <Dropdown
          name="language"
          label="Шрифт"
          value={state.language}
          onChange={handleChange}
        />
        <Input
          name="comment"
          type="text"
          label="Шрифт"
          value={state.comment}
          onChange={handleChange}
        />
        <ColorSelector
          name="color"
          label = "Цвет"
          colors = { defaultColors }
          defaultColor={state.color}
          onChange={handleChange}
        />
        <div>Размер Стикера</div>
        <div>Радиус Углов</div>
        <div>Контур</div>
        <Button type="submit" text="ЗАКАЗАТЬ" />
      </form>
    </aside>
  )
}
