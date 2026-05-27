import type React from "react";
import { createContext, createElement, useContext, useState } from "react";
import en from "./locales/en";
import es from "./locales/es";
import fr from "./locales/fr";

export type Locale = "en" | "es" | "fr";

export const LOCALES: Record<Locale, typeof en> = { en, es, fr };

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const getInitialLocale = (): Locale => {
  if (typeof window !== "undefined") {
    // 1. Check local storage
    try {
      const saved = localStorage.getItem("napuccino-locale") as Locale | null;
      if (saved && (saved === "en" || saved === "es" || saved === "fr")) {
        return saved;
      }
    } catch (_e) {
      // Silent fallback
    }

    // 2. Check system language
    try {
      const sysLang = navigator.language.split("-")[0];
      if (sysLang === "es" || sysLang === "fr" || sysLang === "en") {
        return sysLang as Locale;
      }
    } catch (_e) {
      // Silent fallback
    }
  }
  return "en"; // Default fallback
};

export function I18nProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (newLocale: Locale): void => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("napuccino-locale", newLocale);
    } catch (_e) {
      // Silent fallback
    }
  };

  const t = (key: string, replacements?: Record<string, string>): string => {
    const keys = key.split(".");
    let current: unknown = LOCALES[locale];

    for (const k of keys) {
      if (current && typeof current === "object" && Object.hasOwn(current, k)) {
        current = (current as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof current !== "string") {
      return key;
    }

    let text = current;
    if (replacements) {
      for (const [placeholder, val] of Object.entries(replacements)) {
        text = text.replace(new RegExp(`{${placeholder}}`, "g"), val);
      }
    }

    return text;
  };

  return createElement(I18nContext.Provider, { value: { locale, setLocale, t } }, children);
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
