import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Layout } from "components";
import { useDocumentTitle } from "hooks";

import s from "./style.module.css";

export function HomePage(  ) {
  useDocumentTitle("Record");
  const history = useHistory();

  const handleLogin = () => history.push("/auth");

  return (
    <Layout>
      <div className={s.container}>
        <div className={s.title}>
          <h1>Учите Слова Легко!</h1>
          <p>просто наклейте стикеры на предметы, которые они обозначают</p>
        </div>
        <Button name="ВОЙТИ" onClick={handleLogin}/>
      </div>
    </Layout>
  )
}
