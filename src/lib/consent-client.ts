/**
 * Delt klientlogikk for samtykkevalget (leses av både banneret og kartet).
 * Lagringen av selve valget er «strengt nødvendig» og krever ikke samtykke.
 *
 * Skrivinger skjer KUN i ConsentBanner-scriptet (én skriver). Andre
 * komponenter ber om endring via CustomEvent «lori:consent-request» og
 * lytter på «lori:consent» for resultatet.
 */
export const CONSENT_KEY = "lori-consent-v1";

export type StoredConsent = { v: 1; embeds: boolean; ts: string };

export function readStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    return typeof parsed.embeds === "boolean" ? parsed : null;
  } catch {
    return null;
  }
}
