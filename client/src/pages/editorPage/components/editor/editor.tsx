import React, { useContext } from "react";

import { Sticker } from "components";

import { EditorContext } from "../../editor";

import s from "./style.module.css";

const dataFirst = {
  word: "Word",
  wordExample: "Word example",
  transcription: "Transcription",
  translation: "Translation",
  translationExample: "Translation example",
}

const dataSecond = {
  word: "WordWordWord",
  wordExample: "Word example Word example Word example",
  transcription: "Transcription Transcription",
  translation: "TranslationTranslationTranslation",
  translationExample: "Translation example Translation Translation example",
}

const dataThird = {
  word: "WordWord",
  wordExample: "Word example Word example Word example",
  transcription: "Transcription Transcription",
  translation: "TranslationTranslation",
  translationExample: "Translation example Translation Translation example",
}

export function Editor () {
  const { context } = useContext<Record<string, any>>(EditorContext);

  return (
    <article className={s.examples}>
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataFirst}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataSecond}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataThird}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataSecond}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataFirst}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataSecond}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataThird}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataSecond}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataThird}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataSecond}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataFirst}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataThird}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataFirst}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataSecond}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataThird}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataSecond}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataFirst}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataThird}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataThird}
      />
      <Sticker
        className={s.sticker}
        size={context.size}
        color={context.color}
        fontFamily={context.fontFamily.value}
        data={dataSecond}
      />
    </article>
  )
}
