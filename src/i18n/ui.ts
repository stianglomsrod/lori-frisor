/**
 * UI-tekster (mikrotekst) for Lori Frisør, per språk.
 *
 * Her ligger fast tekst som IKKE redigeres i Keystatic: knappetekster,
 * seksjonsoverskrifter, tabelltitler osv. Selve innholdet (tjenester,
 * produkter, tilbud, forsidetekst) ligger i src/content/<språk>/.
 *
 * Legg til et nytt språk ved å kopiere `no`-blokken og oversette verdiene.
 */
import type { Locale } from "./config";

export interface NavLink {
  href: string;
  label: string;
}

export interface UIStrings {
  /** <html lang> SEO-tekster. */
  seo: { tagline: string; description: string };
  /** Felles knapper/etiketter. */
  cta: { book: string };
  common: { placeholder: string };
  /** Hovedmeny og bunnmeny (samme ankerlenker på alle språk). */
  nav: NavLink[];
  header: { menu: string; menuAria: string; toTop: string };
  langToggle: { aria: string };
  skipLink: string;
  hero: { seeServices: string };
  trust: {
    aria: string;
    address: string;
    callUs: string;
    hours: string;
    hoursValue: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    book: string;
    onRequest: string;
    priceFrom: (n: number) => string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    caption: string;
    colService: string;
    colFrom: string;
    onRequest: string;
    price: (n: number) => string;
    noteStrong: string;
    noteBefore: string;
    noteOr: string;
    noteContact: string;
    noteAfter: string;
    callUs: string;
  };
  offers: { eyebrow: string; title: string; intro: string };
  products: {
    eyebrow: string;
    title: string;
    intro: string;
    recommended: string;
    reserve: string;
    reserveHidden: (name: string) => string;
    price: (n: number) => string;
    noteBefore: string;
    noteAfter: string;
    smsBody: (name: string) => string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    visitTitle: string;
    address: string;
    phone: string;
    email: string;
    hoursTitle: string;
    hoursCaption: string;
    note: string;
    mapTitle: (address: string) => string;
    directions: string;
  };
  footer: {
    brand: string;
    navAria: string;
    shortcuts: string;
    contact: string;
    copyright: (year: number) => string;
    bookingVia: string;
    edit: string;
  };
  /** Visningsnavn for dager (oversetter de norske dagverdiene i innholdet). */
  days: Record<string, string>;
  closed: string;
}

const navHrefs = ["#tjenester", "#priser", "#tilbud", "#produkter", "#kontakt"];

export const ui: Record<Locale, UIStrings> = {
  no: {
    seo: {
      tagline: "Frisørsalong i hjertet av Halden",
      description:
        "Lori Frisør er en moderne frisørsalong i Halden. Klipp, farge, balayage og behandlinger for hele familien. Bestill time enkelt på nett.",
    },
    cta: { book: "Bestill time" },
    common: { placeholder: "Plassholder" },
    nav: ["Tjenester", "Priser", "Tilbud", "Produkter", "Kontakt"].map(
      (label, i) => ({ href: navHrefs[i], label }),
    ),
    header: {
      menu: "Meny",
      menuAria: "Hovedmeny",
      toTop: "Lori Frisør – til toppen",
    },
    langToggle: { aria: "Bytt språk" },
    skipLink: "Hopp til hovedinnhold",
    hero: { seeServices: "Se tjenester" },
    trust: {
      aria: "Praktisk informasjon",
      address: "Adresse",
      callUs: "Ring oss",
      hours: "Drop-in & timer",
      hoursValue: "Man–fre",
    },
    services: {
      eyebrow: "Tjenester",
      title: "Behandlinger for hele familien",
      intro:
        "Fra klipp og farge til pleie og styling, alltid tilpasset deg. Velg en tjeneste og bestill time når det passer.",
      book: "Bestill",
      onRequest: "Pris etter konsultasjon",
      priceFrom: (n) => `fra ${n} kr`,
    },
    pricing: {
      eyebrow: "Priser",
      title: "Tydelige priser, ingen overraskelser",
      intro:
        "Prisene under er veiledende «fra»-priser. Endelig pris avhenger av hårlengde, tykkelse og ønsket resultat, og avtales i salongen.",
      caption: "Veiledende priser per tjeneste",
      colService: "Tjeneste",
      colFrom: "Fra",
      onRequest: "Etter konsultasjon",
      price: (n) => `${n} kr`,
      noteStrong: "Usikker på hva du trenger?",
      noteBefore:
        "Vi hjelper deg gjerne med en uforpliktende vurdering før vi setter i gang. Ring oss på",
      noteOr: "eller",
      noteContact: "ta kontakt",
      noteAfter: ", så finner vi ut av det sammen.",
      callUs: "Ring oss",
    },
    offers: {
      eyebrow: "Tilbud",
      title: "Aktuelle tilbud nå",
      intro: "Gode grunner til å bestille din neste time hos oss.",
    },
    products: {
      eyebrow: "Produkter",
      title: "Ta salongkvaliteten med hjem",
      intro:
        "Et utvalg favoritter vi bruker og anbefaler. Reserver enkelt, så legger vi det klart til henting neste gang du er innom – du betaler i salongen.",
      recommended: "Anbefalt",
      reserve: "Reserver",
      reserveHidden: (name) => ` ${name} for henting`,
      price: (n) => `${n} kr`,
      noteBefore: "Vil du heller ringe? Ta en telefon til",
      noteAfter: ", så legger vi det klart til deg.",
      smsBody: (name) =>
        `Hei! Jeg vil gjerne reservere «${name}» for henting i salongen.`,
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Finn oss i Halden",
      intro:
        "Sentralt på Torget. Stikk innom, ring, eller bestill time på nett.",
      visitTitle: "Besøk & kontakt",
      address: "Adresse",
      phone: "Telefon",
      email: "E-post",
      hoursTitle: "Åpningstider",
      hoursCaption: "Åpningstider per dag",
      note: "Avbestilling må skje senest 24 timer før timen.",
      mapTitle: (address) => `Kart som viser ${address}`,
      directions: "Få veibeskrivelse",
    },
    footer: {
      brand: "Frisørsalong i hjertet av Halden. Velkommen innom.",
      navAria: "Bunnmeny",
      shortcuts: "Snarveier",
      contact: "Kontakt",
      copyright: (year) =>
        `© ${year} Lori Frisør. Alle rettigheter forbeholdt.`,
      bookingVia: "Booking via Timma.",
      edit: "Rediger siden",
    },
    days: {
      Mandag: "Mandag",
      Tirsdag: "Tirsdag",
      Onsdag: "Onsdag",
      Torsdag: "Torsdag",
      Fredag: "Fredag",
      Lørdag: "Lørdag",
      Søndag: "Søndag",
    },
    closed: "Stengt",
  },

  en: {
    seo: {
      tagline: "Hair salon in the heart of Halden",
      description:
        "Lori Frisør is a modern hair salon in Halden, Norway. Cuts, colour, balayage and treatments for the whole family. Book your appointment easily online.",
    },
    cta: { book: "Book appointment" },
    common: { placeholder: "Placeholder" },
    nav: ["Services", "Prices", "Offers", "Products", "Contact"].map(
      (label, i) => ({ href: navHrefs[i], label }),
    ),
    header: {
      menu: "Menu",
      menuAria: "Main menu",
      toTop: "Lori Frisør – back to top",
    },
    langToggle: { aria: "Change language" },
    skipLink: "Skip to main content",
    hero: { seeServices: "See services" },
    trust: {
      aria: "Practical information",
      address: "Address",
      callUs: "Call us",
      hours: "Drop-in & hours",
      hoursValue: "Mon–Fri",
    },
    services: {
      eyebrow: "Services",
      title: "Treatments for the whole family",
      intro:
        "From cuts and colour to care and styling, always tailored to you. Pick a service and book a time that suits you.",
      book: "Book",
      onRequest: "Price on consultation",
      priceFrom: (n) => `from ${n} kr`,
    },
    pricing: {
      eyebrow: "Prices",
      title: "Clear prices, no surprises",
      intro:
        "The prices below are guideline “from” prices. The final price depends on hair length, thickness and the result you want, and is agreed in the salon.",
      caption: "Guideline prices per service",
      colService: "Service",
      colFrom: "From",
      onRequest: "On consultation",
      price: (n) => `${n} kr`,
      noteStrong: "Not sure what you need?",
      noteBefore:
        "We're happy to give you a no-obligation assessment before we begin. Call us on",
      noteOr: "or",
      noteContact: "get in touch",
      noteAfter: ", and we'll figure it out together.",
      callUs: "Call us",
    },
    offers: {
      eyebrow: "Offers",
      title: "Current offers",
      intro: "Good reasons to book your next appointment with us.",
    },
    products: {
      eyebrow: "Products",
      title: "Take the salon quality home",
      intro:
        "A selection of favourites we use and recommend. Reserve easily and we'll have it ready for pickup next time you stop by – you pay in the salon.",
      recommended: "Recommended",
      reserve: "Reserve",
      reserveHidden: (name) => ` ${name} for pickup`,
      price: (n) => `${n} kr`,
      noteBefore: "Prefer to call? Give us a ring on",
      noteAfter: ", and we'll have it ready for you.",
      smsBody: (name) =>
        `Hi! I'd like to reserve “${name}” for pickup in the salon.`,
    },
    contact: {
      eyebrow: "Contact",
      title: "Find us in Halden",
      intro: "Central on Torget. Drop by, call, or book online.",
      visitTitle: "Visit & contact",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hoursTitle: "Opening hours",
      hoursCaption: "Opening hours per day",
      note: "Cancellations must be made at least 24 hours before the appointment.",
      mapTitle: (address) => `Map showing ${address}`,
      directions: "Get directions",
    },
    footer: {
      brand: "Hair salon in the heart of Halden. Welcome in.",
      navAria: "Footer menu",
      shortcuts: "Shortcuts",
      contact: "Contact",
      copyright: (year) => `© ${year} Lori Frisør. All rights reserved.`,
      bookingVia: "Booking via Timma.",
      edit: "Edit site",
    },
    days: {
      Mandag: "Monday",
      Tirsdag: "Tuesday",
      Onsdag: "Wednesday",
      Torsdag: "Thursday",
      Fredag: "Friday",
      Lørdag: "Saturday",
      Søndag: "Sunday",
    },
    closed: "Closed",
  },
};

export function useTranslations(locale: Locale): UIStrings {
  return ui[locale] ?? ui.no;
}
