import React, {
  SyntheticEvent,
  useState
} from "react";
import { Link, Redirect } from "react-router-dom";

import { Button, Form, Input, Layout } from "components";
import { useDocumentTitle } from "hooks";

import { gql, useMutation } from "@apollo/client";

import s from "./style.module.css";

const AUTH = gql`
  mutation login($email: String!, $password: String!) {
    viewer {
      login (email: $email, password: $password) {
        id
        name
        surname
      }
    }
  }
`;

export interface IState {
  login: string;
  password: string;
}

const initState = {
  login: "p@ya.ru",
  // login: "",
  password: "qwerty123",
  // password: "",
}

export function AuthPage() {
  useDocumentTitle("Record - Auth");
  const [ authData, setAuthData ] = useState<IState>(initState);
  const [ login, { data }] = useMutation(AUTH);
  console.log("authData", authData)
  const handleLogin = () => login({
    variables: {
      email: authData.login,
      password: authData.password,
    },
  });
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setAuthData({ ...authData, [name]: value });
  }

  return (
    <Layout>
      {data?.viewer?.login?.id ? <Redirect to="/editor"/> :
      <div className={s.container}>
        <Form>
          <Input
            name="login"
            className={s.login}
            label="Логин"
            type="text"
            value={authData.login}
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Пароль"
            type="password"
            value={authData.password}
            onChange={handleChange}
          />
          <p className={s.forgot}><a href="http://">Забыли пароль?</a></p>
          <Button
            className={s.button}
            text="ВОЙТИ"
            onClick={handleLogin}
          />
          <p className={s.signup}>
            У вас ещё нет аккаунта?
            <Link to="/signup">Зарегистрироваться</Link>
          </p>
        </Form>
      </div>}
    </Layout>
  )
}
