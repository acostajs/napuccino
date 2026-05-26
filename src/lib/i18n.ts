import en from "./locales/en.json";

/**
 * A minimal typed helper to retrieve localized strings using dot-notation keys.
 * Supports dynamic key replacement using {placeholder} format.
 *
 * @param key The hierarchical dot-notation key (e.g., 'home.hero.title_accent')
 * @param replacements Optional key-value pairs to replace placeholders in the string
 */
export function t(key: string, replacements?: Record<string, string>): string {
  const keys = key.split(".");
  let current: unknown = en;

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
}
