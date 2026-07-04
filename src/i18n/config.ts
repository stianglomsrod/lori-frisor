/**
 * Språkoppsett for Lori Frisør.
 *
 * Slik legger du til et nytt språk:
 *  1. Legg språkkoden til i `locales` under (f.eks. "se" for svensk).
 *  2. Fyll ut tekstene i `src/i18n/ui.ts` for det nye språket.
 *  3. Opprett innholdsfilene i `src/content/<kode>/` (homepage, services,
 *     products, offers) – kopier gjerne fra `no/` og oversett.
 *  4. Legg til en side `src/pages/<kode>/index.astro` (kopi av `en/index.astro`).
 *  5. Legg språket til i `i18n.locales` i `astro.config.mjs`.
 * Resten (meny, språkvelger, Keystatic-dashboard) kobler seg på automatisk.
 */
export const locales = ["no", "en"] as const;
export type Locale = (typeof locales)[number];

/** Standardspråk – vises på rot-URL uten prefiks (norsk på «/»). */
export const defaultLocale: Locale = "no";

/** Språk som har egne innholdsmapper under src/content/<kode>/. */
export const contentLocales = locales;

/** Fullt navn på språket (brukes i Keystatic og evt. UI). */
export const localeLabel: Record<Locale, string> = {
  no: "Norsk",
  en: "English",
};

/** Kort etikett til språkvelgeren. */
export const localeShort: Record<Locale, string> = {
  no: "NO",
  en: "EN",
};

/** Verdi til <html lang="..">. */
export const htmlLang: Record<Locale, string> = {
  no: "nb",
  en: "en",
};

/** Verdi til og:locale (Open Graph). */
export const ogLocale: Record<Locale, string> = {
  no: "nb_NO",
  en: "en_US",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Gjør en ukjent verdi om til et gyldig språk (faller tilbake på standard). */
export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Sti til forsiden på et gitt språk (énsides nettsted). */
export function localeHome(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

/** Sti til personvernerklæringen per språk (egne, oversatte sider). */
export const localePrivacy: Record<Locale, string> = {
  no: "/personvern/",
  en: "/en/privacy/",
};
