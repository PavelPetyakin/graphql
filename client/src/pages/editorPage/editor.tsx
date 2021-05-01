import React, {
  FormEvent,
  useContext,
  useState
} from "react";

import {
  Button,
  ColorSelector,
  Dropdown,
  Input,
  Layout,
  Sticker
} from "components";

import s from "./style.module.css";

const defaultColors: string[] = [
  "#FAF00C",
  "#F6630F",
  "#4ED22D",
  "#6AA4FC",
  "#C4C4C4",
]

const initialValues: Record<string, any> = {
  comment: "Hello!",
  color: "#FAF00C",
  language: "French",
  font: "Roboto",
}

const EditorContext = React.createContext({});

export function EditorPage() {
  const [ context, setContext ] = useState<Record<string, any>>(initialValues);
  console.log("context:", context);
  return (
    <Layout>
      <div className={s.container}>
        <EditorContext.Provider value={{ context, setContext }}>
          <Editor />
          <SideMenu />
        </EditorContext.Provider>
      </div>
    </Layout>
  );
}

const data = {
  word: "Word",
  wordExample: "Word example",
  transcription: "Transcription",
  translation: "Translation",
  translationExample: "Translation example",
}

function Editor () {
  const { context } = useContext<Record<string, any>>(EditorContext);

  return (
    <article>
      <Sticker
        className={s.sticker}
        size="l"
        color={context.color}
        data={data}
      />
      <p>{context.language}</p>
    </article>
  )
}

function SideMenu() {
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
        />
        <Dropdown
          name="font"
          label="Шрифт"
          value={context.font}
          onChange={handleChange}
        />
        <Input
          name="comment"
          type="text"
          label="Шрифт"
          value={context.comment}
          onChange={handleChange}
        />
        <ColorSelector
          name="color"
          label = "Цвет"
          colors = { defaultColors }
          checkedColor={context.color}
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
