import { sign, verify } from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import { client } from "../index";

enum Token {
  ACCESS_TOKEN_SECRET = "41c3f602a048dbada4921dec9a98f039ecf3d1b3a72d49504a3857cdccfb81765e534d14ebc3159848b0fff3d248d64410b197aeb4550573382b30f42b5eef2b",
  REFRESH_TOKEN_SECRET = "6abdd09bd430ca2d74b808c09acdbc73829573974ed7c22decd7e9d249d2d8a39b1efc0199b1e9256c1b766b0e85da35a40418d60ff8fd7fb03137cf1a20232f",
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export async function createTokens (user: any, password: string): Promise<ITokens | null> {
  if (!user) {
    return null;
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return null;
  }

  const accessToken = sign(
    { user: user.id },
    Token.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );

  const refreshToken = sign(
    { user: user.id },
    Token.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken }
}

interface IPayload {
  user: number;
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: number;
}

export async function getUserFromRequest(req: express.Request): Promise<string | object | null> {
  const accessToken = req.cookies['access-token'];
  const refreshToken = req.cookies['refresh-token'];
  if (accessToken) {
    const payload = verify(accessToken, Token.ACCESS_TOKEN_SECRET) as IPayload;
    const userId = payload?.user;
    if (userId) {
      const qText: string = `
          SELECT id, email, name, surname, created
          FROM person
          WHERE id = $1
      `;
      const qValue: number[] = [userId];
      const user = (await client.query(qText, qValue)).rows[0];;
      if (user) {
        if (user.isBanned) {
          throw new Error("Access deny")
        }
        return user;
      }
    }
  }
  return null;
}
