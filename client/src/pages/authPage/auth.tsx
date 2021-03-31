import React, {
  SyntheticEvent,
  useState
} from "react";
import { Link } from "react-router-dom";

import { Button, Form, Input, Layout } from "components";
import { useDocumentTitle } from "hooks";

import { gql, useMutation } from "@apollo/client";

import s from "./style.module.css";

const AUTH = gql`
  mutation login($email: String!, $password: String!) {
    login (email: $email, password: $password) {
      id
      name
      surname
    }
  }
`;

export interface IState {
  login: string;
  password: string;
}

const initState = {
  login: "p@ya.ru",
  password: "qwerty123",
}

export function AuthPage() {
  useDocumentTitle("Record - Auth");
  const [ authData, setAuthData ] = useState<IState>(initState);
  console.log("authData", authData);
  const [ login, { data }] = useMutation(AUTH);
  console.log("data", data)
  const handleLogin = () => login({
    variables: {
      email: authData.login,
      password: authData.password,
    },
  });
  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const type = e.currentTarget?.attributes[0].value;
    const { value } = e.currentTarget;
    const obj = { ...authData };
    if (type === "text") {
      setAuthData({ ...obj, login: value });
    }
    if (type === "password") {
      setAuthData({ ...obj, password: value });
    }
  }

  return (
    <Layout>
      <div className={s.container}>
        <Form>
          <Input
            className={s.login}
            label="Логин"
            type="text"
            value={authData.login}
            onChange={handleChange}
          />
          <Input
            label="Пароль"
            type="password"
            value={authData.password}
            onChange={handleChange}
          />
          <p className={s.forgot}><a href="http://">Забыли пароль?</a></p>
          <Button
            className={s.button}
            name="ВОЙТИ"
            onClick={handleLogin}
          />
          <p className={s.signup}>
            У вас ещё нет аккаунта?
            <Link to="/signup">Зарегистрироваться</Link>
          </p>
        </Form>
      </div>
    </Layout>
  )
}
