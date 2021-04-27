import React from "react";

import { Button, Form, Input, Layout } from "components";
import { useDocumentTitle } from "hooks";

import s from "./style.module.css";

export function SignupPage() {
  useDocumentTitle("Record - Signup");

  return (
    <Layout>
      <div className={s.container}>
        <Form>
          <Input
            className={s.login}
            name="login"
            label="Логин"
            type="text"
            value=""
            onChange={() => undefined}
          />
          <Input
            className={s.password}
            name="password"
            label="Пароль"
            type="password"
            value=""
            onChange={() => undefined}
          />
          <Input
            className={s.confirmPassword}
            name="confirmPassword"
            label="Подтверждение пароля"
            type="password"
            value=""
            onChange={() => undefined}
          />
          <Button
            className={s.button}
            text="ЗАРЕГИСТРИРОВАТЬСЯ"
            onClick={() => undefined}
          />
        </Form>
      </div>
    </Layout>
  );
}
