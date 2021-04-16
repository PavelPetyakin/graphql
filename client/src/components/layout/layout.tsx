import React, { ReactNode } from "react";
import { Link, useHistory } from "react-router-dom";

import { Button } from "components";

import { gql, useQuery } from "@apollo/client";

import s from "./style.module.css";

const USER = gql`
  query user {
    user {
      id
      name
      surname
    }
  }
`;

interface ILayout {
  children: ReactNode;
}

interface IData {
  user: {
    name: string;
    surname: string;
  }
}

export function Layout(props: ILayout) {
  const { children } = props;
  const history = useHistory();
  const { loading, error, data } = useQuery<IData>(USER, {
    fetchPolicy: "network-only",
  });
  console.log("--Layout--:", loading, error, data)
  return (
    <section className={s.layout}>
      <header className={s.header}>
        <Link className={s.logo} to="/">
          <h2>
            Word Stickers
          </h2>
        </Link>
        <div className={s.auth}>
          {loading || !data?.user && (<Button
            className={s.button}
            name="ВОЙТИ"
            onClick={() => history.push("/auth")}
          />)}
          {!loading && data?.user && (<div>
            {`${data.user.name} ${data.user.surname}`}
          </div>)}
        </div>
      </header>
      {children}
    </section>
  )
}
