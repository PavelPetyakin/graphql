import React, { ReactNode } from "react";
import { Link, useHistory } from "react-router-dom";

import { Button, Profile } from "components";
import { IProfileMenuList } from "components/profile/profile";

import { client } from "../../api/client";
import { gql, useMutation,useQuery } from "@apollo/client";

import s from "./style.module.css";

const USER = gql`
  query user {
    me {
      user {
        id
        name
        surname
      }
    }
  }
`;

const LOGOUT = gql`
  mutation logout {
    me {
      logout {
        id
      }
    }
  }
`;

interface ILayout {
  children: ReactNode;
}

interface IData {
  me: {
    user: {
      name: string;
      surname: string;
    }
  }
}


export function Layout(props: ILayout) {
  const { children } = props;
  const history = useHistory();
  const { loading, error, data } = useQuery<IData>(USER, {
    fetchPolicy: "network-only",
  });
  const [logout] = useMutation(LOGOUT);
  const handleLogout = () => logout();

  const list: IProfileMenuList[] = [
    {
      name: "Заказы",
      onClick: () => history.push("/signup"),
    },
    {
      name: "Выйти",
      onClick: handleLogout,
    },
  ];

  console.log("--!!!!!!!!!!!!!!!!!!--:", client.readQuery({
    query: USER,
  }))
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
          {loading || !data?.me?.user && (<Button
            className={s.button}
            text="ВОЙТИ"
            onClick={() => history.push("/auth")}
          />)}
          {!loading && data?.me?.user && (
            <Profile user={data?.me?.user} buttons={list} />
          )}
        </div>
      </header>
      {children}
    </section>
  )
}


