import { getTranslationList } from "./service";

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

export const resolver = {
  translation: async (parent: { type: WordsCategory[] }): Promise<ITranslation[]> => {
    return getTranslationList(parent);
  },
};

