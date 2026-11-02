import { ar } from "./ar";
import { en } from "./en";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDict(locale: Locale) {
  return locale === "en" ? en : ar;
}

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");
