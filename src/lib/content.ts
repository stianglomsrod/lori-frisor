/**
 * Innholdslag for Lori Frisør.
 *
 * Leser innholdet eieren redigerer i Keystatic (src/content/*.yaml + bilder)
 * og returnerer ferdige objekter til komponentene. Faller tilbake på
 * standardverdiene i src/data/*.ts dersom en innholdsfil mangler, slik at
 * siden alltid bygger.
 */
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

import {
  site as siteDefault,
  contact as contactDefault,
  social as socialDefault,
  booking as bookingDefault,
  openingHours as openingHoursDefault,
  navLinks as navLinksDefault,
} from "@data/site";
import { services as servicesDefault, type Service } from "@data/services";
import { products as productsDefault, type Product } from "@data/products";
import { offers as offersDefault, type Offer } from "@data/offers";

const reader = createReader(process.cwd(), keystaticConfig);

/** Normaliser bildereferanse til en /images/-sti. */
const img = (value: string | null | undefined, fallback: string) => {
  if (!value) return fallback;
  if (value.startsWith("/") || value.startsWith("http")) return value;
  return `/images/${value}`;
};

/** Strukturell navigasjon ligger i koden (ikke redigerbar av eier). */
export const navLinks = navLinksDefault;

export type SiteSettings = {
  site: {
    name: string;
    tagline: string;
    description: string;
    city: string;
    url: string;
  };
  contact: {
    addressStreet: string;
    addressZip: string;
    addressCity: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    mapsUrl: string;
  };
  social: { facebook: string; instagram: string };
  booking: { url: string; label: string };
};

export async function getSettings(): Promise<SiteSettings> {
  const s = await reader.singletons.settings.read();
  if (!s) {
    return {
      site: { ...siteDefault },
      contact: { ...contactDefault },
      social: { ...socialDefault },
      booking: { ...bookingDefault },
    };
  }
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${s.contact.addressStreet} ${s.contact.addressZip} ${s.contact.addressCity}`,
  )}`;
  return {
    site: {
      name: s.name,
      tagline: s.tagline,
      description: s.description,
      city: s.city,
      url: s.url ?? siteDefault.url,
    },
    contact: {
      addressStreet: s.contact.addressStreet,
      addressZip: s.contact.addressZip,
      addressCity: s.contact.addressCity,
      phone: s.contact.phone,
      phoneDisplay: s.contact.phoneDisplay,
      email: s.contact.email,
      mapsUrl,
    },
    social: {
      facebook: s.social.facebook ?? socialDefault.facebook,
      instagram: s.social.instagram ?? socialDefault.instagram,
    },
    booking: {
      url: s.booking.url ?? bookingDefault.url,
      label: s.booking.label || bookingDefault.label,
    },
  };
}

export type OpeningDay = { day: string; hours: string; closed: boolean };

export async function getOpeningHours(): Promise<OpeningDay[]> {
  const o = await reader.singletons.openingHours.read();
  if (!o || !o.days || o.days.length === 0) {
    return openingHoursDefault.map((d) => ({
      day: d.day,
      hours: d.hours,
      closed: "closed" in d ? Boolean(d.closed) : false,
    }));
  }
  return o.days.map((d) => ({
    day: d.day,
    hours: d.hours,
    closed: Boolean(d.closed),
  }));
}

export type Homepage = {
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    lead: string;
    bullets: string[];
    image: string;
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    image: string;
    imageAlt: string;
  };
};

const homepageFallback: Homepage = {
  hero: {
    eyebrow: "Frisør i Halden",
    titleStart: "Velstelt hår,",
    titleAccent: "uten stress",
    lead: "Lori Frisør er en moderne salong midt i Halden. Vi tar oss av klipp, farge og behandlinger for hele familien, i rolige og trygge omgivelser. Timen booker du enkelt på nett.",
    bullets: [
      "Enkel booking på nett",
      "Sentralt på Torget 2",
      "Klipp & farge for alle",
    ],
    image: "/images/hero-salon.jpg",
    imageAlt: "Plassholder – bilde fra salongen",
  },
  about: {
    eyebrow: "Om oss",
    title: "En frisør du kan stole på",
    body: "Hos Lori Frisør i Halden tar vi oss tid til deg. Vi tror et godt klipp begynner med en god prat. Derfor blir vi kjent med håret ditt og hva du ser for deg, før saksa kommer fram. Målet er et resultat som er like fint hjemme som i salongstolen.",
    points: [
      "Erfarne frisører som lytter til hva du faktisk vil ha",
      "Rolig atmosfære – godt for både liten og stor",
      "Produkter og pleie tilpasset ditt hår",
    ],
    image: "/images/about-salon.jpg",
    imageAlt: "Plassholder – bilde fra salongen",
  },
};

export async function getHomepage(): Promise<Homepage> {
  const h = await reader.singletons.homepage.read();
  if (!h) return homepageFallback;
  return {
    hero: {
      eyebrow: h.hero.eyebrow || homepageFallback.hero.eyebrow,
      titleStart: h.hero.titleStart || homepageFallback.hero.titleStart,
      titleAccent: h.hero.titleAccent || homepageFallback.hero.titleAccent,
      lead: h.hero.lead || homepageFallback.hero.lead,
      bullets:
        h.hero.bullets && h.hero.bullets.length > 0
          ? [...h.hero.bullets]
          : homepageFallback.hero.bullets,
      image: img(h.hero.image, homepageFallback.hero.image),
      imageAlt: h.hero.imageAlt || homepageFallback.hero.imageAlt,
    },
    about: {
      eyebrow: h.about.eyebrow || homepageFallback.about.eyebrow,
      title: h.about.title || homepageFallback.about.title,
      body: h.about.body || homepageFallback.about.body,
      points:
        h.about.points && h.about.points.length > 0
          ? [...h.about.points]
          : homepageFallback.about.points,
      image: img(h.about.image, homepageFallback.about.image),
      imageAlt: h.about.imageAlt || homepageFallback.about.imageAlt,
    },
  };
}

export async function getServices(): Promise<Service[]> {
  const s = await reader.singletons.services.read();
  if (!s || !s.items || s.items.length === 0) return servicesDefault;
  return s.items.map((it, i) => ({
    id: `svc-${i}`,
    title: it.title,
    description: it.description,
    priceFrom: it.priceFrom ?? null,
    category: it.category as Service["category"],
  }));
}

export type ProductWithImage = Product & { image: string };

export async function getProducts(): Promise<ProductWithImage[]> {
  const p = await reader.singletons.products.read();
  if (!p || !p.items || p.items.length === 0) {
    return productsDefault.map((pr) => ({
      ...pr,
      image: `/images/prod-${pr.id}.jpg`,
    }));
  }
  return p.items.map((it, i) => ({
    id: `prod-${i}`,
    name: it.name,
    brand: it.brand,
    description: it.description,
    price: it.price ?? 0,
    category: it.category as Product["category"],
    featured: Boolean(it.featured),
    image: img(it.image, "/images/hero-salon.jpg"),
  }));
}

export async function getOffers(): Promise<Offer[]> {
  const o = await reader.singletons.offers.read();
  if (!o) return offersDefault;
  return o.items.map((it, i) => ({
    id: `offer-${i}`,
    badge: it.badge,
    title: it.title,
    description: it.description,
    fineprint: it.fineprint ?? undefined,
  }));
}
