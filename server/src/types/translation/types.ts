import { IGraphQLFieldConfig } from "../shcema";

export interface ITranslationResolver {
  translation: IGraphQLFieldConfig<Record<string, string>, ITranslationArgs>;
}

export interface ITranslation {
  id: number;
  type: string;
  word: string;
  transcription: string;
  translation: string;
  word_example: string;
  translation_example: string;
}

export enum WordsCategory {
  DAY = "DAY",
  WEEKDAY = "WEEKDAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
  SEASON = "SEASON",
  HUMAN = "HUMAN",
  FAMILY = "FAMILY",
  EDUCATION = "EDUCATION",
  ANIMAL = "ANIMAL"
}

export enum Language {
  en = "english",
  fr = "french",
  ru = "russian",
  es = "spanish",
  de = "german",
}

export interface ITranslationArgs {
  type: WordsCategory[];
  lang: Language[];
}
