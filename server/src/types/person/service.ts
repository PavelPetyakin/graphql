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
  const { name, email, password, surname=null } = args;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const qText: string = `
      INSERT INTO person (name, surname, email, password)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const qValue: (string | null)[] = [name, surname, email, hashedPassword];
    return (await client.query(qText, qValue)).rows[0];
  } catch (err) {
    throw new Error("Failed to find person");
  }
}

export async function loginUser(args: ILoginUserArgs, context: IContext): Promise<Omit<IPerson, "password"> | null> {
  const { email, password } = args;
  const { res } = context;
  try {
    const qText: string = `
      SELECT * FROM person
      WHERE person.email = $1
    `;
    const qValue: string[] = [email];
    const user: IPerson = (await client.query(qText, qValue)).rows[0];
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return null;
    }
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
    const { password: p, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (err) {
    throw new Error("Failed to find person");
  }
}
