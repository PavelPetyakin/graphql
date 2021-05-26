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
  TIME = "TIME",
  ANIMAL = "ANIMAL",
  WEEKDAY = "WEEKDAY"
}

export enum Language {
  EN = "english",
  FR = "french",
  RU = "russian",
  ES = "spanish",
  DE = "german",
}

export interface ITranslationArgs {
  type: WordsCategory[];
  lang: Language[];
}
