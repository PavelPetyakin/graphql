import { ITranslation, WordsCategory } from "./resolver";
import { client } from "../../index";

export async function getTranslationList(parent: { type: WordsCategory[] }): Promise<ITranslation[]> {
  try {
    const qText: string = "SELECT * from translations WHERE type = 'TIME' or type = 'WEEKDAY'";
    const qValue: WordsCategory[] = parent.type;
    console.log('qValue', qValue)
    const x = (await client.query(qText)).rows;
    console.log('return:', x)
    return x;
  } catch (err) {
    throw new Error("Failed to amount people");
  }
}
