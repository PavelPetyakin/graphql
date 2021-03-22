import { ITranslation, WordsCategory } from "./types";
import { client } from "../../index";

export async function getTranslationList(type: WordsCategory[]): Promise<ITranslation[]> {
  let qValue: string = "";
  if (type.length > 0) {
    qValue = "WHERE " + type.map((it: WordsCategory, index: number) => {
      return index ? `or type = '${it}'` : `type = '${it}'`
    }).join(" ");
  }
  try {
    const qText: string = `SELECT * from translation ${qValue}`;
    return (await client.query(qText)).rows;
  } catch (err) {
    throw new Error("Failed to amount people");
  }
}
