import bcrypt from "bcrypt";

import { createTokens } from "../../auth";
import { client } from "../../index";
import { IContext } from "../shcema";

import { IAuth,
  ILoginUserArgs,
  IPerson,
  IRegisterUserArgs,
  IUsersArgs,
} from "./types";

export async function getUsers(
  args: IUsersArgs
): Promise<IPerson[]> {
  const { sortBy, sort } = args.sorting;
  try {
    const qText = `
    SELECT id, name, surname, email
    FROM person
    ORDER BY ${sortBy} ${sort}
  `;
    return (await client.query(qText)).rows;
  } catch (err) {
    throw new Error("Failed to select people");
  }
}

// export async function getUser(
//   context: IContext
// ): Promise<IPerson | null> {
//   if (context.user) {
//     try {
//       const qText = `
//       SELECT id, email, name, surname, created, role
//       FROM graphql.public.person
//       WHERE id = $1
//     `;
//       const qValue: number[] = [context.user.id];
//       return (await client.query(qText, qValue)).rows[0];
//     } catch (err) {
//       throw new Error("Failed to find person");
//     }
//   }
//   return null;
// }

export async function registerUser(args: IRegisterUserArgs): Promise<IPerson> {
  const { name, email, password, surname = null } = args;
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  try {
    const qText = `
      INSERT INTO person (name, surname, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, surname, email, created
    `;
    const qValue: (string | null)[] = [ name, surname, email, hashedPassword ];
    return (await client.query(qText, qValue)).rows[0];
  } catch (err) {
    throw new Error("Failed to register person");
  }
}

export async function loginUser(
  args: ILoginUserArgs, context: IContext
): Promise<IPerson | null> {
  const { email, password } = args;
  const { res } = context;
  try {
    const qText = `
      SELECT * FROM person
      WHERE person.email = $1
    `;
    const qValue: string[] = [email];
    const user: IAuth = (await client.query(qText, qValue)).rows[0];
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
        maxAge: 604800000,
        // maxAge: 300000,
        httpOnly: true
      });
    res.cookie(
      "access-token",
      accessToken,
      {
        maxAge: 900000,
        // maxAge: 60000,
        httpOnly: true
      });
    // eslint-disable-next-line no-unused-vars
    const { password: p, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (err) {
    throw new Error("Failed to find person");
  }
}
