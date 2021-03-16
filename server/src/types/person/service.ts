import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../auth";
import { IPerson,
  IRegisterUserArgs,
  IUsersArgs,
  IUserArgs,
  ILoginUserArgs,
} from "./types";
import { client } from "../../index";
import { IContext } from "../shcema";


export async function getUsers(args: IUsersArgs): Promise<IPerson[]> {
  const { sorting } = args;
  try {
    let qText: string = "SELECT * FROM person ORDER BY created DESC";
    if (sorting) {
      if (sorting.sortBy && sorting.sort) {
        qText = `SELECT * FROM person ORDER BY ${sorting.sortBy} ${sorting.sort}`;
      } else if (sorting.sortBy) {
        qText = `SELECT * FROM person ORDER BY ${sorting.sortBy}`;
      } else if (sorting.sort) {
        qText = `SELECT * FROM person ORDER BY ${sorting.sort}`;
      }
    }
    return (await client.query(qText)).rows;
  } catch (err) {
    throw new Error("Failed to select people");
  }
}

export async function getPeopleAmount(): Promise<number> {
  try {
    const qText: string = "SELECT count(*) from person";
    return (await client.query(qText)).rows[0].count;
  } catch (err) {
    throw new Error("Failed to amount people");
  }
}

export async function getUser(args: IUserArgs): Promise<IPerson> {
  const { id } = args;
  try {
    const qText: string = `
      SELECT
        "user"."id",
        "user"."email",
        "order"."id" AS "order_id",
        "order"."description",
        "user"."name",
        "user"."surname",
        "user"."created"
      FROM person AS "user"
               LEFT JOIN orders AS "order" ON "user".id = "order".person_id
      WHERE "user".id = $1
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
  const { req, res } = context;
  try {
    const qText: string = `
      SELECT * FROM person
      WHERE person.email = $1
    `;
    const qValue: string[] = [email];
    const user = (await client.query(qText, qValue)).rows[0];
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return null;
    }
    const refreshToken = sign(
      { id: user.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    const accessToken = sign(
      { id: user.id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    const curDate: number = new Date().getTime();
    const endRefreshTokenDate: Date = new Date(curDate + 900);
    const endAccessTokenDate: Date = new Date(curDate + 604800);
    res.cookie("refresh-token", refreshToken, { expires: endRefreshTokenDate });
    res.cookie("access-token", accessToken, { expires: endAccessTokenDate });
    return user;
  } catch (err) {
    throw new Error("Failed to find person");
  }
}
