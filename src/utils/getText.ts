import { get } from 'lodash-es';
import baseLang from '../en.json';

export type TextType = keyof typeof langMap[LangType][CategoryType];
export type CategoryType = keyof typeof langMap[LangType];
export type LangType = keyof typeof langMap;

const langMap = {
  en: baseLang,
};

export const getText = (category: CategoryType, text: TextType | string, lang: LangType = 'en') => {
  return get(langMap, [lang, category, text], text);

}

export default getText;
