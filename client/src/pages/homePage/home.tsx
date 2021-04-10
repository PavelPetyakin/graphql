import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import { Button, Card, Layout } from "components";
import { useComponentDidMount,useDocumentTitle } from "hooks";

import s from "./style.module.css";

export function HomePage() {
  useDocumentTitle("Record");
  const history = useHistory();
  const isMounted = useComponentDidMount();
  let header = null;
  if (isMounted) {
    header = document.getElementById("header");
  }

  console.log("header", header);
  console.log("isMount", isMounted);

  return (
    <Layout>
      <div className={s.container}>
        <div className={s.title}>
          <h1>Учите Слова Легко!</h1>
          <p>просто наклейте стикеры на предметы, которые они обозначают</p>
        </div>
        <Card className={s.card} />
      </div>
      {header && ReactDOM.createPortal(
        <Button
          name="ВОЙТИ"
          onClick={() => history.push("/auth")}
        />, header)}
    </Layout>
  )
}
