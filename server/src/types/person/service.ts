import bcrypt from "bcrypt";
import { createTokens, ITokens } from "../../auth";
import { IPerson,
  IRegisterUserArgs,
  IUsersArgs,
  IUserArgs,
  ILoginUserArgs,
} from "./types";
import { client } from "../../index";
import { IContext } from "../shcema";

export async function getUsers(args: IUsersArgs, context: IContext): Promise<IPerson[]> {
  const { sortBy, sort } = args.sorting;
  const { req } = context;
  console.log("getUsers - req:", req.cookies);
  try {
    const qText: string = `
      SELECT id, name, surname, email
      FROM person
      ORDER BY ${sortBy} ${sort}
    `;
    return (await client.query(qText)).rows;
  } catch (err) {
    throw new Error("Failed to select people");
  }
}

export async function getUser(args: IUserArgs): Promise<IPerson> {
  const { id } = args;
  try {
    const qText: string = `
        SELECT id, email, name, surname, created
        FROM person
        WHERE id = $1
    `;
    const qValue: number[] = [id];
    return (await client.query(qText, qValue)).rows[0];
  } catch (err) {
    throw new Error("Failed to find person");
  }
}

export async function registerUser(args: IRegisterUserArgs): Promise<IPerson> {
  const { name, email, password } = args;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const qText: string = `
      INSERT INTO person (name, email, password)
      VALUES ($1, $2, $3) RETURNING *
    `;
    const qValue: string[] = [name, email, hashedPassword];
    return (await client.query(qText, qValue)).rows[0];
  } catch (err) {
    throw new Error("Failed to find person");
  }
}

export async function loginUser(args: ILoginUserArgs, context: IContext): Promise<IPerson | null> {
  const { email, password } = args;
  const { res } = context;
  try {
    const qText: string = `
      SELECT * FROM person
      WHERE person.email = $1
    `;
    const qValue: string[] = [email];
    const user = (await client.query(qText, qValue)).rows[0];
    const tokens: ITokens | null = await createTokens(user, password);
    if (!tokens) {
      return null;
    }
    const { accessToken, refreshToken } = tokens;
    console.log("tokens", tokens);
    const curDate: number = new Date().getTime();
    const endRefreshTokenDate: Date = new Date(curDate + 900000);
    const endAccessTokenDate: Date = new Date(curDate + 604800000);
    res.cookie("refresh-token", refreshToken, { expires: endRefreshTokenDate });
    res.cookie("access-token", accessToken, { expires: endAccessTokenDate });
    const { password: p, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (err) {
    throw new Error("Failed to find person");
  }
}
