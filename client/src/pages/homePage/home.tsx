import React from "react";

import { Card, Layout } from "components";
import { useDocumentTitle } from "hooks";

import s from "./style.module.css";

export function HomePage() {
  useDocumentTitle("Record");

  return (
    <Layout>
      <div className={s.container}>
        <div className={s.title}>
          <h1>Учите Слова Легко!</h1>
          <p>просто наклейте стикеры на предметы, которые они обозначают</p>
        </div>
        <Card className={s.card} />
      </div>
    </Layout>
  )
}
