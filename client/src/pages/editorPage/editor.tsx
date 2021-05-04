import React, { useState } from "react";

import { Layout } from "components";

import { Editor, SideMenu } from "./components";

import s from "./style.module.css";

const initialValues: Record<string, any> = {
  color: "#FAF00C",
  language: { value: "en", label: "English" },
  fontFamily: { value: "Roboto Slab", label: "Roboto" },
  size: "Medium",
}

export const EditorContext = React.createContext({});

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

