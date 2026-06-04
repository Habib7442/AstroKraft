import 'server-only';
import type { Locale } from './seo';
import { DEFAULT_LOCALE } from './seo';
import en from '../messages/en.json';
import hin from '../messages/hin.json';
import bn from '../messages/bn.json';

const dictionaries = {
  en,
  hin,
  bn,
} as const;

export type SupportedLocale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is SupportedLocale => {
  return locale in dictionaries;
};

export const getDictionary = async (locale: string) => {
  if (hasLocale(locale)) {
    return dictionaries[locale];
  }
  // Fall back to default locale if a translation is missing or fast-followed (e.g. ta, te, mr)
  return dictionaries[DEFAULT_LOCALE as SupportedLocale];
};

