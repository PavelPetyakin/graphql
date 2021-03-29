import React, {
  ReactNodeArray,
  SyntheticEvent,
  useState
} from "react";

import { Button, Input, Layout } from "components";

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

interface IState {
  login: string;
  password: string;
}

const initState = {
  login: "p@ya.ru",
  password: "qwerty123",
}

export function AuthPage() {
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
          <p className={s.forgot}>Забыли пароль?</p>
          <Button
            className={s.button}
            name="ВОЙТИ"
            onClick={handleLogin}
          />
        </Form>
      </div>
    </Layout>
  )
}

interface IForm {
  className?: string
  children: ReactNodeArray
}

function Form(props: IForm) {
  const { className, children } = props;
  console.log("children", children)
  return (
    <form className={className}>
      {children.map((el) => {
        return el;
      })}
    </form>
  )
}
