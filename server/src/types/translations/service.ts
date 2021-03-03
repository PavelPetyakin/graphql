import { ITranslation, WordsCategory } from "./resolver";
import { client } from "../../index";

export async function getTranslationList(parent: { type: WordsCategory[] }): Promise<ITranslation[]> {
  let qValue: string = "";
  if (parent.type.length > 0) {
    qValue = "WHERE " + parent.type.map((it: WordsCategory, index: number) => {
      return index ? `or type = '${it}'` : `type = '${it}'`
    }).join(" ");
  }
  try {
    const qText: string = `SELECT * from translations ${qValue}`;
    return (await client.query(qText)).rows;
  } catch (err) {
    throw new Error("Failed to amount people");
  }
}
