import React, { FormEvent, useContext } from "react";

import { Button, ColorSelector, Dropdown, SizeSelector } from "components";

import { EditorContext } from "../../editor";

import s from "./style.module.css";

const defaultColors: string[] = [
  "#FAF00C",
  "#F6630F",
  "#4ED22D",
  "#6AA4FC",
  "#C4C4C4",
];

const languageOptions = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "French",
  }
];

const sizeOptions = [
  "Small",
  "Medium",
  "Large",
];

const fontFamilyOptions = [
  {
    value: "Dusha",
    label: "Dusha",
  },
  {
    value: "Roboto Slab",
    label: "Roboto",
  }
];

export function SideMenu() {
  // eslint-disable-next-line max-len
  const { context, setContext } = useContext<Record<string, any>>(EditorContext);
  const handleChange = (val: Record<string, string>) => {
    setContext({ ...context, ...val })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit:", e);
  }

  return (
    <aside className={s.settings}>

      <form className={s.form} onSubmit={handleSubmit} >
        <Dropdown
          name="language"
          label="Язык"
          value={context.language}
          onChange={handleChange}
          options={languageOptions}
        />
        <Dropdown
          name="fontFamily"
          label="Шрифт"
          value={context.fontFamily}
          onChange={handleChange}
          options={fontFamilyOptions}
        />
        <SizeSelector
          name="size"
          label = "Размер Стикера"
          options = { sizeOptions }
          checkedColor={context.size}
          onChange={handleChange}
        />
        <ColorSelector
          name="color"
          label = "Цвет"
          options = { defaultColors }
          checkedColor={context.color}
          onChange={handleChange}
        />
        <div>Радиус Углов</div>
        <div>Контур</div>
        <Button type="submit" text="ЗАКАЗАТЬ" />
      </form>
    </aside>
  )
}
