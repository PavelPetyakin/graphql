import { IPerson } from "./resolver";
import { client } from "../../index";

export async function getPeople(parent: any): Promise<IPerson[]> {
  try {
    let qText: string = "SELECT * FROM persons ORDER BY created DESC";
    if (parent && parent.sorting) {
      if (parent.sorting.sortBy && parent.sorting.sort) {
        qText = `SELECT * FROM persons ORDER BY ${parent.sorting.sortBy} ${parent.sorting.sort}`;
      } else if (parent.sorting.sortBy) {
        qText = `SELECT * FROM persons ORDER BY ${parent.sorting.sortBy}`;
      } else if (parent.sorting.sort) {
        qText = `SELECT * FROM persons ORDER BY ${parent.sorting.sort}`;
      }
    }
    return (await client.query(qText)).rows;
  } catch (err) {
    throw new Error("Failed to select people");
  }
}

export async function getPeopleAmount(): Promise<number> {
  try {
    const qText: string = "SELECT count(*) from persons";
    return (await client.query(qText)).rows[0].count;
  } catch (err) {
    throw new Error("Failed to amount people");
  }
}

export async function getPerson(parent: {id: string}): Promise<IPerson> {
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
      FROM persons AS "user"
               LEFT JOIN orders AS "order" ON "user".id = "order".person_id
      WHERE "user".id = $1
    `;
    const qValue: string[] = [parent.id];
    return (await client.query(qText, qValue)).rows[0];
  } catch (err) {
    throw new Error("Failed to find person");
  }
}
