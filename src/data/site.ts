/**
 * Sentral konfigurasjon for Lori Frisør.
 * Bytt ut verdier her når ekte innhold / merkevare er klart.
 * Holder kontaktinfo, navigasjon og booking-lenke ett sted.
 */

export const site = {
  name: "Lori Frisør",
  tagline: "Frisørsalong i hjertet av Halden",
  description:
    "Lori Frisør er en moderne frisørsalong i Halden. Klipp, farge, balayage og behandlinger for hele familien. Bestill time enkelt på nett.",
  city: "Halden",
  url: "https://www.lorifrisor.no",
} as const;

export const contact = {
  addressStreet: "Torget 2",
  addressZip: "1767",
  addressCity: "Halden",
  phone: "45050677",
  phoneDisplay: "450 50 677",
  email: "cindy@lori.no",
  // Google Maps-søk på adressen (placeholder – bytt til ev. eget Maps-embed/Place ID).
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Torget+2+1767+Halden",
} as const;

/** Kjente plattformer får eget ikon; «other» får generisk lenke-ikon. */
export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "snapchat"
  | "youtube"
  | "other";

export type SocialLink = {
  platform: SocialPlatform;
  /** Visningsnavn. Tomt = plattformnavnet (f.eks. «Facebook»). */
  label: string;
  url: string;
};

export const social: SocialLink[] = [
  { platform: "facebook", label: "", url: "https://www.facebook.com/LoriFrisor" },
  { platform: "instagram", label: "", url: "https://www.instagram.com/lorifrisor/" },
];

/** Booking håndteres av Timma. Alle «Bestill time»-CTA-er peker hit. */
export const booking = {
  url: "https://bestill.timma.no/lorifrisor",
  label: "Bestill time",
} as const;

/**
 * PLACEHOLDER: Åpningstider er antatt og må bekreftes med salongen.
 * `closed: true` viser «Stengt».
 */
export const openingHours = [
  { day: "Mandag", hours: "09:00–17:00" },
  { day: "Tirsdag", hours: "09:00–17:00" },
  { day: "Onsdag", hours: "09:00–17:00" },
  { day: "Torsdag", hours: "10:00–19:00" },
  { day: "Fredag", hours: "09:00–17:00" },
  { day: "Lørdag", hours: "Stengt", closed: true },
  { day: "Søndag", hours: "Stengt", closed: true },
] as const;

/** Hovednavigasjon. Alle peker på seksjons-ankere på forsiden. */
export const navLinks = [
  { href: "#tjenester", label: "Tjenester" },
  { href: "#priser", label: "Priser" },
  { href: "#tilbud", label: "Tilbud" },
  { href: "#produkter", label: "Produkter" },
  { href: "#kontakt", label: "Kontakt" },
] as const;
