import { sign, verify } from "jsonwebtoken";

import { client } from "../index";
import { IPerson } from "../types/person";
import { IContext } from "../types/shcema";

export enum Token {
  // eslint-disable-next-line max-len
  ACCESS_TOKEN_SECRET = "41c3f602a048dbada4921dec9a98f039ecf3d1b3a72d49504a3857cdccfb81765e534d14ebc3159848b0fff3d248d64410b197aeb4550573382b30f42b5eef2b",
  // eslint-disable-next-line max-len
  REFRESH_TOKEN_SECRET = "6abdd09bd430ca2d74b808c09acdbc73829573974ed7c22decd7e9d249d2d8a39b1efc0199b1e9256c1b766b0e85da35a40418d60ff8fd7fb03137cf1a20232f",
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export function createTokens (user: Pick<IPerson, "id">): ITokens {
  const accessToken = sign(
    { userId: user.id },
    Token.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );

  const refreshToken = sign(
    { userId: user.id },
    Token.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken }
}

export interface IPayload {
  userId: number;
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: number;
}

export async function getUserFromRequest(
  props: Pick<IContext, "req" | "res">
): Promise<IPerson | null> {
  const { req, res } = props;
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];

  if (accessToken) {
    const payload = verify(accessToken, Token.ACCESS_TOKEN_SECRET) as IPayload;
    const userId = payload?.userId;
    if (userId) {
      const x = await getUserById({ id: userId });
      console.log("user!!!!!!", x)
      return  x
    }
    return null;
  }

  if (refreshToken) {
    const payload = verify(refreshToken, Token.REFRESH_TOKEN_SECRET)as IPayload;
    const userId = payload?.userId;
    if (userId) {
      const user = await getUserById({ id: userId });
      if (user) {
        const { accessToken, refreshToken } = createTokens({ id: user.id });
        res.cookie(
          "refresh-token",
          refreshToken,
          {
            // maxAge: 604800000,
            maxAge: 300000,
            httpOnly: true
        });
        res.cookie(
          "access-token",
          accessToken,
          {
            // maxAge: 900000,
            maxAge: 60000,
            httpOnly: true
        });
      }
    }
    return null;
  }

  return null;
}

async function getUserById(
  { id }: Pick<IPerson, "id">
): Promise<IPerson | null> {
  // TODO replace database table
  //  from graphql.public.person to person
  const qText = `
    SELECT id, email, name, surname, created, roles
    FROM graphql.public.person
    WHERE id = $1
  `;
  const qValue: number[] = [id];
  try {
    return (await client.query(qText, qValue)).rows[0];
  } catch (e) {
    console.error(e)
  }
  return null;
}
