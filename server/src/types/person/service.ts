import { IPerson } from "./types";
import { client } from "../../index";

export async function getPeople(sorting: any): Promise<IPerson[]> {
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

export async function getPerson(id: string): Promise<IPerson> {
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
    const qValue: string[] = [id];
    return (await client.query(qText, qValue)).rows[0];
  } catch (err) {
    throw new Error("Failed to find person");
  }
}
