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
  // Fall back to DEFAULT_LOCALE if it is supported, otherwise fallback to 'en'
  const fallback = hasLocale(DEFAULT_LOCALE) ? DEFAULT_LOCALE : 'en';
  return dictionaries[fallback];
};

