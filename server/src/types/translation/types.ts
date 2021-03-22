import { IGraphQLFieldConfig } from "../shcema";

export interface ITranslationResolver {
  translation: IGraphQLFieldConfig<Record<string, string>, ITranslationArgs>;
}

export interface ITranslation {
  id: number;
  type: string;
  english: string;
  transcription: string;
  russian: string;
  english_example: string;
  russian_example: string;
}

export enum WordsCategory {
  TIME = "TIME",
  ANIMAL = "ANIMAL",
  WEEKDAY = "WEEKDAY"
}

export interface ITranslationArgs {
  type: WordsCategory[];
}
