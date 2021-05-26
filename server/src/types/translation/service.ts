import { client } from "../../index";

import { ITranslation, ITranslationArgs, WordsCategory } from "./types";

export async function getTranslationList(
  args: ITranslationArgs
): Promise<ITranslation[]> {
  const { type, lang } = args;

  const qValue = "WHERE " + type.map((it: WordsCategory, index: number) => {
    return index ? `or type = '${it}'` : `type = '${it}'`
  }).join(" ");

  const params = `
    ${lang} as word,
    ${lang}_example as word_example,
    ${lang}_transcription as transcription,
    russian as translation,
    russian_example as translation_example
  `
  console.log("params", params)
  try {
    const qText = `SELECT ${params} from translation ${qValue}`;
    const translation = (await client.query(qText)).rows;
    console.log("translation", translation)
    return translation;
  } catch (err) {
    throw new Error("Failed get Translation List");
  }
}
